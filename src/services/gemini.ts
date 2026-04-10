import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for a state benefits eligibility system. 

Execution Rules:
1. Tone and Style: Use a direct, factual, and strictly objective tone. Do not use marketing jargon, consultant terminology, or conversational filler. 
2. Standard Terminology: Use standard and factual government terminology.
3. Security Boundary: NEVER use the terms "neuro-symbolic", "Rules as Code", "probabilistic", or "deterministic" in your output. Present yourself simply as the state agency's policy and verification system.
4. Refusal Parameter: If a query is unrelated to benefits eligibility or system operation, output exactly: "System alert: Query outside established parameters."`;

const VERIFICATION_RULES: Record<string, string> = {
  'id-citizenship': 'Target Verification: Identity Verification (6 CFR Part 37).',
  'residency': 'Target Verification: Residency Verification (42 CFR 435.403).',
  'earned-income': 'Target Verification: Earned Income (SNAP 7 CFR 273.9).',
  'unearned-income': 'Target Verification: Unearned Income (UI/SSI).',
  'asset-verification': 'Target Verification: Resource & Asset Test.',
  'abawd-work': 'Target Verification: Work Compliance Logs (7 CFR 273.24).',
  'medical-exemption': 'Target Verification: Medical Exemption.',
  'shelter-utility': 'Target Verification: Shelter/Utility Costs (LIHEAP).',
  'dependent-care': 'Target Verification: Dependent Care (CCDF).',
  'vita-intake': 'Target Verification: VITA Tax Intake (13614-C).'
};

const PERSONA_INSTRUCTIONS: Record<'client' | 'worker', string> = {
  'client': `
[PERSONA DIRECTIVE: CLIENT PORTAL]
You are interacting directly with a resident. Communicate plainly and directly at a 5th-grade reading level. Do not explain backend system logic.
- TEXT QUERY (No Document): Answer the question factually and simply based on the active document category.
- DOCUMENT UPLOADED: Provide a simple receipt. State the recognized document type and conclude exactly with: "Status: Document received. Pending caseworker review."`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
You are an automated policy assistant for a state caseworker. Provide strict, factual policy guidance and document extraction diagnostics.
- TEXT QUERY (No Document): Act as a policy reference. Answer the question directly, citing the specific CFRs or state statutes relevant to the active verification type.
- DOCUMENT UPLOADED: Execute extraction. List extracted fields and confidence scores. If all scores appear high, output "PROCEED TO RULES ENGINE". Otherwise, output "REQUIRES HITL REVIEW".`
};

export interface FileData {
  mimeType: string;
  data: string;
}

export async function getChatResponse(
  message: string, 
  history: { role: 'user' | 'model', parts: any[] }[] = [],
  fileData?: FileData | null,
  policyId?: string,
  persona: 'client' | 'worker' = 'client'
) {
  const timestamp = new Date().toISOString();
  const requestId = Math.random().toString(36).substring(7);

  try {
    let systemInstructionOverride = BASE_SYSTEM_INSTRUCTION;
    if (policyId && VERIFICATION_RULES[policyId]) {
      systemInstructionOverride += `\n\n[SYSTEM DIRECTIVE: ENFORCE STATUTORY RULE]\n${VERIFICATION_RULES[policyId]}`;
    }
    
    systemInstructionOverride += `\n\n${PERSONA_INSTRUCTIONS[persona]}`;

    const userParts: any[] = [];
    const safeMessage = message.trim();
    
    if (fileData) {
      const execMessage = safeMessage || "Execute automated evaluation against active verification type.";
      userParts.push({ text: `[SYSTEM: Document payload attached.]\nUser Input: ${execMessage}` });
      userParts.push({
        inlineData: {
          data: fileData.data,
          mimeType: fileData.mimeType
        }
      });
    } else {
      userParts.push({ text: `[SYSTEM: No document attached. Text query only.]\nUser Input: ${safeMessage || "Provide a summary of the active verification type."}` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: userParts }
      ],
      config: {
        systemInstruction: systemInstructionOverride,
        temperature: 0.1,
      },
    });

    const output = response.text || "System alert: Unable to connect to the analysis engine.";
    
    console.log(`[APS-SANDBOX-LOG] ID: ${requestId} | Time: ${timestamp} | Persona: ${persona.toUpperCase()}`);
    console.log(`[POLICY ID]: ${policyId || 'None'} | Attached: ${fileData ? 'Yes' : 'No'}`);
    return output;
  } catch (error) {
    console.error(`[APS-SANDBOX-ERROR] ID: ${requestId} | Time: ${timestamp}`, error);
    return "System alert: Connection timeout. Verify API configuration.";
  }
}