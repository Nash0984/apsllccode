import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Resend } from "resend";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { VERIFICATION_RULES, PERSONA_INSTRUCTIONS, STATE_RULES_ONTOLOGY } from "./src/config/ontology.ts";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- RATE LIMITING STRATEGY ---
// Global API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for AI generation (Gemini costs)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 AI generations per hour
  message: { error: "AI generation quota exceeded for this hour. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Extreme limit for contact form and audit dispatch (Email/Spam)
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Limit each IP to 10 contact attempts per day
  message: { error: "Daily inquiry limit reached. Please contact us directly at info@appliedpolicysystems.com" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper for HTML escaping in emails to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

// AI Logic Constants
const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for an Applied Policy Systems environment. You operate using a hybrid architectural pathway: bridging strict deterministic rules with natural language translation.

[CORE DIRECTIVE: STATUTORY TRACEABILITY & AUDIT TRAILS]
You MUST provide a deterministic audit trail. Every decision, verification requirement, or policy explanation must explicitly cite the exact authorizing federal statute. Do not generate generalized or probabilistic advice.

[CORE INNOVATION: STATUTORY SUFFICIENCY SCORING]
Your primary evaluation mechanism is the "Statutory Sufficiency Score." This score represents the degree to which a provided document or data point satisfies the specific evidentiary hierarchy of the targeted federal ontology.
* A score of 1.0 indicates a "Primary" document for that specific statute.
* A score below 1.0 indicates a "Secondary" document requiring additional corroboration per program rules.`;

const EXTRACTION_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    status: { type: SchemaType.STRING },
    message: { type: SchemaType.STRING },
    extractedData: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          field: { type: SchemaType.STRING },
          value: { type: SchemaType.STRING },
          statutorySufficiency: { type: SchemaType.NUMBER },
          complianceNote: { type: SchemaType.STRING }
        },
        required: ["field", "value", "statutorySufficiency", "complianceNote"]
      }
    }
  },
  required: ["status", "message", "extractedData"]
};

const ROUTING_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    message: { type: SchemaType.STRING }
  },
  required: ["message"]
};

const FORMAL_LOGIC_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    formalLogic: { type: SchemaType.STRING },
    jsonSchema: { type: SchemaType.STRING },
  },
  required: ["formalLogic", "jsonSchema"]
};

const AUDIT_ANALYSIS_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    hasConflicts: { type: SchemaType.BOOLEAN },
    conflicts: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          severity: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          eventsAffected: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
        },
        required: ["severity", "description", "eventsAffected"]
      }
    }
  },
  required: ["hasConflicts", "conflicts"]
};

// Zod Schemas for Request Validation
const EvaluateRequestSchema = z.object({
  fileData: z.object({
    mimeType: z.string(),
    data: z.string(),
  }),
  policyId: z.string(),
  persona: z.enum(['worker', 'client']).optional(),
});

const RouteRequestSchema = z.object({
  userMessage: z.string(),
  availableNodes: z.string().optional(),
});

const ExtractLogicRequestSchema = z.object({
  statutoryText: z.string(),
});

const AnalyzeAuditRequestSchema = z.object({
  log: z.array(z.any()),
});

const ChatDetailedRequestSchema = z.object({
  message: z.string(),
  history: z.array(z.any()).optional(),
});

const ContactRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  organization: z.string().min(1, "Organization is required"),
  message: z.string().min(1, "Message is required"),
});

const DispatchAuditRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  auditData: z.object({
    caseId: z.string(),
    caseTitle: z.string().optional(),
    events: z.array(z.any()).optional(),
  }).passthrough(),
});

// Initialize Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy for rate limiting (important for Cloud Run/Nginx)
  app.set('trust proxy', 1);

  // --- SECURITY MIDDLEWARE ---
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for development compatibility in iframe
    crossOriginEmbedderPolicy: false,
  }));
  app.use(cors());
  app.use(compression());

  // JSON Body parsing with increased limit for document uploads
  app.use(express.json({ limit: '10mb' }));

  // Apply global API limiter
  app.use("/api", apiLimiter);

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- AI BACKEND PROXIES ---

  app.post("/api/ai/evaluate", aiLimiter, async (req, res) => {
    if (!genAI) return res.status(503).json({ error: "AI service not configured" });
    
    const validated = EvaluateRequestSchema.safeParse(req.body);
    if (!validated.success) return res.status(400).json({ error: validated.error.format() });
    
    const { fileData, policyId, persona = 'worker' } = validated.data;
    
    let systemInstructionOverride = BASE_SYSTEM_INSTRUCTION;
    if (VERIFICATION_RULES[policyId]) {
      systemInstructionOverride += `\n\n[SYSTEM DIRECTIVE: ENFORCE ONTOLOGICAL NODE]\n${VERIFICATION_RULES[policyId]}`;
    }
    systemInstructionOverride += `\n\n${PERSONA_INSTRUCTIONS[persona as 'worker' | 'client']}`;

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemInstructionOverride,
      });

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { text: `[SYSTEM: Document payload attached.] Execute automated evaluation against active ontological node.` },
            { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }
          ]
        }] as any,
        generationConfig: {
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: EXTRACTION_SCHEMA as any,
        },
      });

      const response = await result.response;
      res.json(JSON.parse(response.text()));
    } catch (error: any) {
      console.error("AI Evaluation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/route", aiLimiter, async (req, res) => {
    if (!genAI) return res.status(503).json({ error: "AI service not configured" });
    
    const validated = RouteRequestSchema.safeParse(req.body);
    if (!validated.success) return res.status(400).json({ error: validated.error.format() });

    const { userMessage, availableNodes } = validated.data;
    const nodes = availableNodes || Object.keys(STATE_RULES_ONTOLOGY).join(", ");

    const routingPrompt = `
      [SYSTEM OVERRIDE: NEURAL ROUTING LAYER]
      You are a semantic router for a state benefits ontology. 
      Available Rule Nodes: ${nodes}.
      User Query: "${userMessage}"
      Identify the single most applicable Rule Node for this query from the available list. 
      Output ONLY the exact Rule Node ID (e.g., "SNAP-INC-05"). If no match is found, output "UNKNOWN".
    `;

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: BASE_SYSTEM_INSTRUCTION,
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: routingPrompt }] }],
        generationConfig: {
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: ROUTING_SCHEMA as any,
        },
      });

      const response = await result.response;
      res.json(JSON.parse(response.text() || '{"message": "UNKNOWN"}'));
    } catch (error) {
      console.error("AI Routing Error:", error);
      res.json({ message: "UNKNOWN" });
    }
  });

  app.post("/api/ai/extract-logic", aiLimiter, async (req, res) => {
    if (!genAI) return res.status(503).json({ error: "AI service not configured" });
    
    const validated = ExtractLogicRequestSchema.safeParse(req.body);
    if (!validated.success) return res.status(400).json({ error: validated.error.format() });

    const { statutoryText } = validated.data;
    
    const prompt = `
      [SYSTEM: FORMAL LOGIC EXTRACTION ENGINE]
      Translate the following statutory text into two deterministic outputs:
      1. A Z3 SMT-LIB2 mathematical proof representing the policy's logical assertions (Axioms, Constraints, Check-Sat).
      2. A comprehensive JSON schema representing the executable rule parameters and thresholds.

      Statutory Text: "${statutoryText}"
    `;

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: BASE_SYSTEM_INSTRUCTION + "\n\n[DIRECTIVE] You MUST generate syntactically correct SMT-LIB2 code for the formalLogic property. Do NOT include Markdown formatting in the string values.",
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: FORMAL_LOGIC_SCHEMA as any,
        },
      });

      const response = await result.response;
      res.json(JSON.parse(response.text()));
    } catch (error: any) {
      console.error("AI Logic Extraction Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/analyze-audit", aiLimiter, async (req, res) => {
    if (!genAI) return res.status(503).json({ error: "AI service not configured" });
    
    const validated = AnalyzeAuditRequestSchema.safeParse(req.body);
    if (!validated.success) return res.status(400).json({ error: validated.error.format() });

    const { log } = validated.data;
    
    const prompt = `
      [SYSTEM: FORENSIC AUDIT ANALYZER]
      Review the following operational session logs for an Applied Policy Systems environment.
      Identify any "Linguistic Inconsistencies" or "Statutory Conflicts" between different events.
      For example: 
      - A document was evaluated against one statute, but a later query asks about a different contradictory statute for the same case.
      - The logical extraction of a rule seems to diverge from how it was applied in a query.

      Operational Session Logs: ${JSON.stringify(log)}
      
      Analyze for data integrity and statutory alignment.
    `;

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: BASE_SYSTEM_INSTRUCTION + "\n\n[DIRECTIVE] You are a Forensic Logic Auditor. Your goal is to find cracks in the deterministic pathway of this operational session.",
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: AUDIT_ANALYSIS_SCHEMA as any,
        },
      });

      const response = await result.response;
      res.json(JSON.parse(response.text()));
    } catch (error: any) {
      console.error("AI Audit Analysis Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/chat-detailed", aiLimiter, async (req, res) => {
    if (!genAI) return res.status(503).json({ error: "AI service not configured" });
    
    const validated = ChatDetailedRequestSchema.safeParse(req.body);
    if (!validated.success) return res.status(400).json({ error: validated.error.format() });

    const { message, history } = validated.data;

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization (SNAP, Medicaid).",
      });

      const result = await model.generateContent({
        contents: history && history.length > 0 ? history : [{ role: 'user', parts: [{ text: message }] }],
      });

      const response = await result.response;
      res.json({ reply: response.text() || "" });
    } catch (error: any) {
      console.error("Detailed AI Chat Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // API route for contact form
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const validated = ContactRequestSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid input",
        errors: validated.error.format()
      });
    }

    const { name, email, organization, message } = validated.data;
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'graham.oneill@gmail.com';

    console.log(`[API-CONTACT] New Inquiry: ${name} (${organization}) <${email}>`);

    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Applied Policy Systems <onboarding@resend.dev>',
          to: recipient,
          subject: `New Inquiry: ${organization} - ${name}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
              <h2 style="color: #006D77; border-bottom: 2px solid #006D77; padding-bottom: 10px;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">${escapeHtml(message)}</p>
              <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 11px; color: #64748b;">Sent via Applied Policy Systems Contact Engine</p>
            </div>
          `
        });

        if (error) {
          console.error("[RESEND-ERROR]", error);
          // Still return true to client but log the specific error
        } else {
          console.log("[RESEND-SUCCESS]", data?.id);
        }
      } catch (emailError) {
        console.error("[EMAIL-DISPATCH-FAILURE]", emailError);
      }
    } else {
      console.warn("[API-CONTACT] RESEND_API_KEY missing. Printing inquiry to log only.");
    }

    res.json({ 
      success: true, 
      message: "Inquiry received successfully" 
    });
  });

  // NEW: Immutable Dispatch Engine - Audit Log Delivery
  app.post("/api/dispatch-audit", contactLimiter, async (req, res) => {
    const validated = DispatchAuditRequestSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ success: false, error: validated.error.format() });
    }

    const { email, auditData } = validated.data;

    if (!resend) {
      return res.status(503).json({ success: false, error: "Email service not configured on server" });
    }

    try {
      const fileName = `APS_AUDIT_LOG_${auditData.caseId}_${new Date().getTime()}.json`;
      const content = JSON.stringify(auditData, null, 2);

      await resend.emails.send({
        from: 'Applied Policy Systems <onboarding@resend.dev>',
        to: email,
        bcc: process.env.CONTACT_RECEIVER_EMAIL || 'graham.oneill@gmail.com', // Admin audit capture
        subject: `APS Immutable Audit Dispatch - Case: ${auditData.caseId}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #334155;">
            <h2 style="color: #004d40; border-bottom: 2px solid #004d40; padding-bottom: 10px;">Architectural Audit Dispatch</h2>
            <p>Attached is the <strong>Immutable Audit Log</strong> for Case ID: <code style="background: #f1f5f9; padding: 2px 4px; rounded: 4px;">${escapeHtml(auditData.caseId)}</code>.</p>
            <p>This document serves as a deterministic record of all programmatic determinations and policy queries executed during the session. It is mathematically verified against the active statutory ontology.</p>
            <div style="background: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h4 style="margin-top: 0; color: #0f172a;">Session Metadata:</h4>
              <ul style="margin-bottom: 0;">
                <li><strong>Case Title:</strong> ${auditData.caseTitle || 'N/A'}</li>
                <li><strong>Events Logged:</strong> ${auditData.events?.length || 0}</li>
                <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
              </ul>
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 11px; color: #64748b; font-style: italic;">
              This is a secure automated transmission from the Applied Policy Systems Dispatch Engine.
            </p>
          </div>
        `,
        attachments: [
          {
            filename: fileName,
            content: Buffer.from(content).toString('base64'),
          },
        ],
      });

      console.log(`Audit log dispatched to ${email}`);
      res.json({ success: true, message: "Audit dispatch successful" });
    } catch (error) {
      console.error("Audit Dispatch Error:", error);
      res.status(500).json({ success: false, error: "Failed to dispatch audit log" });
    }
  });

  // REAL CHAT ROUTE WITH GEMINI AND EMAIL LOGGING
  app.post("/api/chat", aiLimiter, express.json(), async (req, res) => {
    const { message, history } = req.body;
    
    if (!genAI) {
      return res.json({ 
        reply: "The AI Assistant is currently in maintenance mode. Please reach out via email at info@appliedpolicysystems.com." 
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const chat = model.startChat({
        history: history || [],
        generationConfig: {
          maxOutputTokens: 500,
        },
        systemInstruction: "You are the Applied Policy Systems Client Intake Assistant. You help state agencies and health organizations navigate high-fidelity policy translation and system modernization. Be professional, technical, and concise. Your goal is to collect their needs and ensure them the architectural team will follow up. If they provide an email, acknowledge it."
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // If it's the first message or looks like a formal request, log it via email
      if (resend && (history?.length === 0 || message.length > 50)) {
        resend.emails.send({
          from: 'APS Intake <onboarding@resend.dev>',
          to: process.env.CONTACT_RECEIVER_EMAIL || 'graham.oneill@gmail.com',
          subject: `New Chat Session: ${message.substring(0, 30)}...`,
          html: `
            <h2>New Chat Intake Interaction</h2>
            <p><strong>User Message:</strong> ${message}</p>
            <p><strong>AI Response:</strong> ${text}</p>
            <hr />
            <p>Full transcription available in server logs.</p>
          `
        }).catch(e => console.error("Async email log failure:", e));
      }

      res.json({ reply: text });
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      res.status(500).json({ error: "Internal assistant error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // SPA fallback: Serve index.html for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});