import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for an Applied Policy & Verification Demonstrator. You operate using a neurosymbolic pathway: bridging strict deterministic rules with natural language translation.

Execution Rules:
1. Tone and Style: Use a direct, factual, and strictly objective tone.
2. Standard Terminology: Use standard government and statutory terminology when operating as the system.
3. Output Format: You MUST output valid, raw JSON only. Do not include markdown formatting (e.g., \`\`\`json). Do not include any introductory or concluding text. 

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
[PERSONA DIRECTIVE: RESIDENT NAVIGATOR]
- NEUROSYMBOLIC TRANSLATION PROTOCOL: You are a living policy engine. When asked a policy or eligibility question, you must mentally ground your answer in actual federal/state statutes.
- TEXT QUERY: Translate the strict statutory rule into an empathetic, 5th-grade reading level explanation in the "message" field. You MUST explicitly state that your answer is based on official law or program rules (e.g., "Based on the official state guidelines..." or "According to the federal rules for this program..."). However, you are strictly forbidden from quoting specific CFR numbers, USC codes, or using bureaucratic jargon. Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Set status to "PENDING AGENCY REVIEW". Set "message" to: "Your document has been securely submitted and is pending caseworker review." Leave "extractedData" empty.`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
- STATUTORY GROUNDING PROTOCOL: You are a strict policy operations copilot.
- TEXT QUERY: Provide comprehensive, text-based conversational answers to complex case scenarios or eligibility questions in the "message" field. You MUST explicitly state the statutory basis for your answer and cite specific state or federal statutes (e.g., CFR sections, USC codes) within the text. Explain how the text of the statute applies to the question. Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute deterministic extraction based on the active verification type. Populate "extractedData" with fields and confidence scores. Set "message" to empty. If all confidence scores are >= 0.85, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`
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