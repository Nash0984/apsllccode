import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { VERIFICATION_RULES, PERSONA_INSTRUCTIONS, STATE_RULES_ONTOLOGY } from "../config/ontology";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : (import.meta as any).env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

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

  const ai = getGenAI();
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstructionOverride,
  });

  const contents = [{
    role: 'user',
    parts: [
      { text: `[SYSTEM: Document payload attached.] Execute automated evaluation against active ontological node.` },
      { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }
    ]
  }];

  try {
    const result = await model.generateContent({
      contents: contents as any,
      generationConfig: {
        temperature: 0.0,
        responseMimeType: "application/json",
        responseSchema: EXTRACTION_SCHEMA as any,
      },
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response received from the evaluation engine.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      console.error(`[APS-EXTRACTION-PARSE-ERROR] ID: ${requestId}`, parseError);
      throw new Error("Failed to parse the evaluation results. The response format was invalid.");
    }

    if (!parsedData.extractedData || !Array.isArray(parsedData.extractedData)) {
      throw new Error("Invalid schema: 'extractedData' array is missing or invalid.");
    }

    return parsedData;
  } catch (error: any) {
    console.error(`[APS-EXTRACTION-ERROR] ID: ${requestId}`, error);
    
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
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ 
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
    return JSON.parse(response.text() || '{"message": "UNKNOWN"}');
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
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization (SNAP, Medicaid).",
    });

    const result = await model.generateContent({
      contents: history.length > 0 ? history : [{ role: 'user', parts: [{ text: message }] }],
    });

    const response = await result.response;
    return response.text() || "";
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
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ 
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
    const text = response.text();

    if (!text) {
      throw new Error("Empty response received from the formal logic engine.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text);
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
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ 
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
    const text = response.text();

    if (!text) {
      throw new Error("Empty response received from the audit logic analyzer.");
    }

    try {
      return JSON.parse(text);
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
