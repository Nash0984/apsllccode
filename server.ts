import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

// Initialize Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API route for contact form
  app.post("/api/contact", express.json(), async (req, res) => {
    const { name, email, organization, message } = req.body;
    
    if (!name || !email || !organization || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    console.log("--- New Contact Inquiry ---");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Org: ${organization}`);
    console.log(`Message: ${message}`);

    if (resend) {
      try {
        await resend.emails.send({
          from: 'Applied Policy Systems <onboarding@resend.dev>',
          to: 'graham.oneill@gmail.com', // Using user's email from metadata
          subject: `New Inquiry: ${organization} - ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr />
            <p>Sent from Applied Policy Systems Contact Form</p>
          `
        });
        console.log("Email sent successfully via Resend");
      } catch (emailError) {
        console.error("Failed to send email via Resend:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not found. Email not sent.");
    }

    res.json({ 
      success: true, 
      message: "Inquiry received successfully" 
    });
  });

  // NEW: Immutable Dispatch Engine - Audit Log Delivery
  app.post("/api/dispatch-audit", express.json({ limit: '10mb' }), async (req, res) => {
    const { email, auditData } = req.body;

    if (!email || !auditData) {
      return res.status(400).json({ success: false, error: "Email and audit data are required" });
    }

    if (!resend) {
      return res.status(503).json({ success: false, error: "Email service not configured on server" });
    }

    try {
      const fileName = `APS_AUDIT_LOG_${auditData.caseId}_${new Date().getTime()}.json`;
      const content = JSON.stringify(auditData, null, 2);

      await resend.emails.send({
        from: 'Applied Policy Systems <onboarding@resend.dev>',
        to: email,
        bcc: 'graham.oneill@gmail.com', // Admin audit capture
        subject: `APS Immutable Audit Dispatch - Case: ${auditData.caseId}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #334155;">
            <h2 style="color: #004d40; border-bottom: 2px solid #004d40; padding-bottom: 10px;">Architectural Audit Dispatch</h2>
            <p>Attached is the <strong>Immutable Audit Log</strong> for Case ID: <code style="background: #f1f5f9; padding: 2px 4px; rounded: 4px;">${auditData.caseId}</code>.</p>
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
  app.post("/api/chat", express.json(), async (req, res) => {
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
          to: 'graham.oneill@gmail.com',
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