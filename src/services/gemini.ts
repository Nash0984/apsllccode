import { GoogleGenAI, Type } from "@google/genai";
import { VERIFICATION_RULES, PERSONA_INSTRUCTIONS, STATE_RULES_ONTOLOGY } from "../config/ontology";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for an Applied Policy Systems environment. You operate using a hybrid architectural pathway: bridging strict deterministic rules with natural language translation.

[CORE DIRECTIVE: STATUTORY TRACEABILITY & AUDIT TRAILS]
You MUST provide a deterministic audit trail. Every decision, verification requirement, or policy explanation must explicitly cite the exact authorizing federal statute. Do not generate generalized or probabilistic advice.

[CORE INNOVATION: STATUTORY SUFFICIENCY SCORING]
Your primary evaluation mechanism is the "Statutory Sufficiency Score." This score represents the degree to which a provided document or data point satisfies the specific evidentiary hierarchy of the targeted federal ontology.
* A score of 1.0 indicates a "Primary" document for that specific statute.
* A score below 1.0 indicates a "Secondary" document requiring additional corroboration per program rules.`;

export interface FileData {
  mimeType: string;
  data: string;
}

const EXTRACTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    status: { type: Type.STRING },
    message: { type: Type.STRING },
    extractedData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          field: { type: Type.STRING },
          value: { type: Type.STRING },
          statutorySufficiency: { type: Type.NUMBER },
          complianceNote: { type: Type.STRING }
        },
        required: ["field", "value", "statutorySufficiency", "complianceNote"]
      }
    }
  },
  required: ["status", "message", "extractedData"]
};

const ROUTING_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    message: { type: Type.STRING }
  },
  required: ["message"]
};

const FORMAL_LOGIC_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    formalLogic: { type: Type.STRING },
    jsonSchema: { type: Type.STRING },
  },
  required: ["formalLogic", "jsonSchema"]
};

const AUDIT_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    hasConflicts: { type: Type.BOOLEAN },
    conflicts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          severity: { type: Type.STRING },
          description: { type: Type.STRING },
          eventsAffected: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["severity", "description", "eventsAffected"]
      }
    }
  },
  required: ["hasConflicts", "conflicts"]
};

export async function evaluateDocument(
  fileData: FileData,
  policyId: string,
  persona: 'client' | 'worker' = 'worker'
) {
  const requestId = `EXTRACT-${Math.random().toString(36).substring(7)}`;
  
  let systemInstructionOverride = BASE_SYSTEM_INSTRUCTION;
  if (VERIFICATION_RULES[policyId]) {
    systemInstructionOverride += `\n\n[SYSTEM DIRECTIVE: ENFORCE ONTOLOGICAL NODE]\n${VERIFICATION_RULES[policyId]}`;
  }
  systemInstructionOverride += `\n\n${PERSONA_INSTRUCTIONS[persona]}`;

  const contents = [{
    role: 'user',
    parts: [
      { text: `[SYSTEM: Document payload attached.] Execute automated evaluation against active ontological node.` },
      { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }
    ]
  }];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        temperature: 0.0,
        responseMimeType: "application/json",
        responseSchema: EXTRACTION_SCHEMA,
        systemInstruction: systemInstructionOverride,
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response received from the evaluation engine.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(response.text);
    } catch (parseError) {
      console.error(`[APS-EXTRACTION-PARSE-ERROR] ID: ${requestId}`, parseError);
      throw new Error("Failed to parse the evaluation results. The response format was invalid.");
    }

    // Basic schema validation
    if (!parsedData.extractedData || !Array.isArray(parsedData.extractedData)) {
      throw new Error("Invalid schema: 'extractedData' array is missing or invalid.");
    }

    return parsedData;
  } catch (error: any) {
    console.error(`[APS-EXTRACTION-ERROR] ID: ${requestId}`, error);
    
    // Check if it's already a custom error we threw
    if (error.message && (
      error.message.includes("Empty response") ||
      error.message.includes("Failed to parse") ||
      error.message.includes("Invalid schema")
    )) {
      throw error;
    }

    // Wrap external API errors with more specific feedback
    if (error.message && error.message.includes("API key not valid")) {
      throw new Error("API Authentication failed. Please check your API key.");
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error during evaluation. Please check your connection.");
    } else {
      throw new Error(`Evaluation processing failed: ${error.message || "Unknown error occurred"}`);
    }
  }
}

export async function routePolicyQuery(
  userMessage: string,
  availableNodes?: string
) {
  const requestId = `ROUTE-${Math.random().toString(36).substring(7)}`;
  
  // Use provided nodes or extract from ontology if not provided
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: routingPrompt }] }],
      config: {
        temperature: 0.0,
        responseMimeType: "application/json",
        responseSchema: ROUTING_SCHEMA,
        systemInstruction: BASE_SYSTEM_INSTRUCTION,
      },
    });

    return JSON.parse(response.text || '{"message": "UNKNOWN"}');
  } catch (error) {
    console.error(`[APS-ROUTING-ERROR] ID: ${requestId}`, error);
    return { message: "UNKNOWN" };
  }
}

export async function getConversationalResponse(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.length > 0 ? history : [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization (SNAP, Medicaid).",
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Conversational API Error:", error);
    return "Error communicating with the conversational agent backend.";
  }
}

export async function extractFormalLogic(statutoryText: string) {
  const requestId = `SMT-${Math.random().toString(36).substring(7)}`;
  
  const prompt = `
    [SYSTEM: FORMAL LOGIC EXTRACTION ENGINE]
    Translate the following statutory text into two deterministic outputs:
    1. A Z3 SMT-LIB2 mathematical proof representing the policy's logical assertions (Axioms, Constraints, Check-Sat).
    2. A comprehensive JSON schema representing the executable rule parameters and thresholds.

    Statutory Text: "${statutoryText}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: FORMAL_LOGIC_SCHEMA,
        systemInstruction: BASE_SYSTEM_INSTRUCTION + "\n\n[DIRECTIVE] You MUST generate syntactically correct SMT-LIB2 code for the formalLogic property. Do NOT include Markdown formatting in the string values.",
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response received from the formal logic engine.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(response.text);
    } catch (parseError) {
      console.error(`[APS-FORMAL-LOGIC-PARSE-ERROR] ID: ${requestId}`, parseError);
      throw new Error("Failed to parse formal logic outputs. Format was invalid.");
    }

    if (!parsedData.formalLogic || !parsedData.jsonSchema) {
      throw new Error("Invalid schema: 'formalLogic' or 'jsonSchema' missing.");
    }

    return parsedData;
  } catch (error: any) {
    console.error(`[APS-FORMAL-LOGIC-ERROR] ID: ${requestId}`, error);
    
    if (error.message && (
      error.message.includes("Empty response") ||
      error.message.includes("Failed to parse") ||
      error.message.includes("Invalid schema")
    )) {
      throw error;
    }

    if (error.message && error.message.includes("API key not valid")) {
      throw new Error("API Authentication failed. Please check your API key.");
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error during logic extraction. Please check your connection.");
    } else {
      throw new Error(`Logic extraction failed: ${error.message || "Unknown error occurred"}`);
    }
  }
}

export async function analyzeAuditTrail(log: any[]) {
  const requestId = `AUDIT-${Math.random().toString(36).substring(7).toUpperCase()}`;
  
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.0,
        responseMimeType: "application/json",
        responseSchema: AUDIT_ANALYSIS_SCHEMA,
        systemInstruction: BASE_SYSTEM_INSTRUCTION + "\n\n[DIRECTIVE] You are a Forensic Logic Auditor. Your goal is to find cracks in the deterministic pathway of this operational session.",
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response received from the audit logic analyzer.");
    }

    try {
      return JSON.parse(response.text);
    } catch (parseError) {
      console.error(`[APS-AUDIT-ANALYSIS-PARSE-ERROR] ID: ${requestId}`, parseError);
      throw new Error("Failed to parse the audit results. The response format was invalid.");
    }
  } catch (error: any) {
    console.error(`[APS-AUDIT-ANALYSIS-ERROR] ID: ${requestId}`, error);

    if (error.message && (
      error.message.includes("Empty response") ||
      error.message.includes("Failed to parse")
    )) {
      throw error;
    }

    if (error.message && error.message.includes("API key not valid")) {
      throw new Error("API Authentication failed. Please check your API key.");
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error during audit verification. Please check your connection.");
    } else {
      throw new Error(`Audit verification failed: ${error.message || "Unknown error occurred"}`);
    }
  }
}