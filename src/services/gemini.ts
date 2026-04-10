import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for a state benefits policy and verification demonstrator. 

Execution Rules:
1. Tone and Style: Use a direct, factual, and strictly objective tone.
2. Standard Terminology: Use standard government terminology.
3. Security Boundary: Present yourself simply as the automated evaluation engine.
4. Output Format: You MUST output valid, raw JSON only. Do not include markdown formatting (e.g., \`\`\`json). Do not include any introductory or concluding text. 

JSON Schema Requirement:
{
  "status": "PROCEED TO RULES ENGINE" | "REQUIRES HITL REVIEW" | "PENDING AGENCY REVIEW" | "POLICY GUIDANCE" | "ERROR",
  "message": "Public facing receipt or policy explanation.",
  "extractedData": [
    { "field": "Name of extracted data point", "value": "Extracted value", "confidence": 0.99 }
  ]
}`;

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
- TEXT QUERY: Act as a benefits navigator. Set status to "POLICY GUIDANCE". Provide a 5th-grade reading level explanation regarding general eligibility, application steps, or program rules in the "message" field. Leave "extractedData" empty.
- DOCUMENT UPLOADED: Set status to "PENDING AGENCY REVIEW". Set "message" to: "Document received. Pending caseworker review." Leave "extractedData" empty.`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
- TEXT QUERY: Act as a comprehensive policy reference. Set status to "POLICY GUIDANCE". Answer complex case scenario or eligibility rule questions in the "message" field, citing specific state or federal statutes (e.g., CFRs). Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute extraction based on the active verification type. Populate "extractedData" with fields and confidence scores. Set "message" to empty. If all confidence scores are >= 0.85, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`
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
    if (fileData && policyId && VERIFICATION_RULES[policyId]) {
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
      userParts.push({ text: `[SYSTEM: No document attached. Text query only.]\nUser Input: ${safeMessage || "Provide policy guidance."}` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: userParts }
      ],
      config: {
        systemInstruction: systemInstructionOverride,
        temperature: 0.0,
      },
    });

    const rawText = response.text || "{}";
    const cleanJsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    console.log(`[APS-SANDBOX-LOG] ID: ${requestId} | Time: ${timestamp} | Persona: ${persona.toUpperCase()}`);
    return JSON.parse(cleanJsonString);

  } catch (error) {
    console.error(`[APS-SANDBOX-ERROR] ID: ${requestId} | Time: ${timestamp}`, error);
    return {
      status: "ERROR",
      message: "System alert: Connection timeout or JSON parse failure.",
      extractedData: []
    };
  }
}