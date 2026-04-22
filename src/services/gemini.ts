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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(`[APS-EXTRACTION-ERROR] ID: ${requestId}`, error);
    throw error;
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