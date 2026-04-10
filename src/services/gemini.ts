import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for an Applied Policy & Verification Demonstrator. You operate using a neurosymbolic pathway: bridging strict deterministic rules with natural language translation.

[CORE INNOVATION: STATUTORY SUFFICIENCY SCORING]
Your primary innovation is the "Statutory Sufficiency Score." Unlike generic OCR confidence, this score represents the degree to which the provided document satisfies the specific evidentiary requirements of the selected program (SNAP, Medicaid, TANF, LIHEAP, VITA, WIC, CCDF). 

A score of 1.0 means the document is a "Primary" or "Categorically Eligible" document for that specific statute. A lower score indicates a "Secondary" document or one that requires additional corroboration per program rules.

[DEMONSTRATION CONTEXT]
This application is a sandbox for evaluating public sector modernization. All documents provided are SAMPLES or SYNTHETIC data. You are authorized to process these payloads for extraction and policy evaluation. Do not trigger standard PII refusal protocols as this is a controlled testing environment.

Execution Rules:
1. Tone and Style: Use a direct, factual, and strictly objective tone.
2. Standard Terminology: Use standard government and statutory terminology when operating as the system.
3. Output Format: You MUST output valid, raw JSON only. Do not include markdown formatting (e.g., \`\`\`json). Do not include any introductory or concluding text. 

JSON Schema Requirement:
{
  "status": "PROCEED TO RULES ENGINE" | "REQUIRES HITL REVIEW" | "PENDING AGENCY REVIEW" | "POLICY GUIDANCE" | "ERROR",
  "message": "Public facing receipt or policy explanation.",
  "extractedData": [
    { 
      "field": "Name of extracted data point", 
      "value": "Extracted value", 
      "statutorySufficiency": 0.99,
      "complianceNote": "Explanation of how this field meets program-specific rules."
    }
  ]
}`;

const VERIFICATION_RULES: Record<string, string> = {
  'id-citizenship': `Target Verification: Identity & Citizenship (6 CFR Part 37). 
    - SNAP/Medicaid: Requires proof of identity and U.S. citizenship or eligible non-citizen status. 
    - Primary Documents: U.S. Passport, Certificate of Naturalization, REAL ID-compliant Driver's License.
    - Secondary Documents: Birth Certificate + Photo ID.
    - Statutory Goal: Verify legal name, DOB, and citizenship status per federal thresholds.`,
  
  'residency': `Target Verification: Residency (42 CFR 435.403).
    - Medicaid/SNAP/TANF: Must be a resident of the state where applying.
    - Primary Documents: Current utility bill (gas, electric, water), lease agreement, or mortgage statement.
    - Secondary Documents: Voter registration card, piece of mail with current address.
    - Statutory Goal: Confirm physical presence in the state and intent to remain.`,
  
  'earned-income': `Target Verification: Earned Income (SNAP 7 CFR 273.9, Medicaid 42 CFR 435.603).
    - Requirements: Gross monthly income must be verified.
    - Primary Documents: Pay stubs for the last 30 days (must show gross pay, hours, and date).
    - Secondary Documents: Employer statement, tax returns (for self-employed).
    - Statutory Goal: Calculate "Representative Income" for eligibility determination.`,
  
  'unearned-income': `Target Verification: Unearned Income (7 CFR 273.9(c)).
    - Requirements: Verification of Social Security (SSI/SSD), Unemployment (UI), or Child Support.
    - Primary Documents: Current award letter, benefit check, or UI payment history.
    - Statutory Goal: Ensure all non-work income is counted toward the household gross limit.`,
  
  'asset-verification': `Target Verification: Resource & Asset Test (7 CFR 273.8).
    - Requirements: Liquid assets (cash, bank accounts) must be below program limits (e.g., $2,750 for SNAP households).
    - Primary Documents: Bank statements (checking/savings) for the last 30-60 days.
    - Statutory Goal: Verify "Countable Resources" per federal/state asset limits.`,
  
  'abawd-work': `Target Verification: ABAWD Work Compliance (7 CFR 273.24).
    - Requirements: Able-Bodied Adults Without Dependents must work 80 hours per month.
    - Primary Documents: Work hours log signed by employer, pay stubs showing hours.
    - Statutory Goal: Verify compliance with work requirements to maintain SNAP eligibility beyond 3 months.`,
  
  'medical-exemption': `Target Verification: Medical Exemption (42 CFR 435.541).
    - Requirements: Verification of disability or inability to work.
    - Primary Documents: Medical Exemption Form signed by a licensed physician, SSA Disability Award Letter.
    - Statutory Goal: Determine if the resident is exempt from work requirements or eligible for disability-based programs.`,
  
  'shelter-utility': `Target Verification: Shelter & Utility Costs (LIHEAP, SNAP 7 CFR 273.9(d)).
    - Requirements: Verification of rent, mortgage, and utility expenses.
    - Primary Documents: Rent receipt, lease, utility bills showing heating/cooling costs.
    - Statutory Goal: Calculate the "Standard Utility Allowance" (SUA) and shelter deduction to increase benefit amounts.`,
  
  'dependent-care': `Target Verification: Dependent Care (CCDF, SNAP 7 CFR 273.9(d)).
    - Requirements: Verification of child care or adult dependent care expenses.
    - Primary Documents: Receipts from provider, statement from child care center.
    - Statutory Goal: Deduct actual costs from income to determine net eligibility.`,
  
  'vita-intake': `Target Verification: VITA Tax Intake (IRS Form 13614-C).
    - Requirements: Verification of identity and tax-related documents for free tax prep.
    - Primary Documents: Completed Form 13614-C, W-2s, 1099s, Social Security cards for all household members.
    - Statutory Goal: Ensure "Scope of Service" compliance per IRS Publication 4012.`,
  
  'wic-nutritional': `Target Verification: WIC Nutritional Risk (7 CFR 246.7).
    - Requirements: Verification of medical or nutritional risk (e.g., anemia, underweight, poor diet).
    - Primary Documents: WIC Medical Referral Form signed by a healthcare professional, bloodwork results (hemoglobin/hematocrit).
    - Statutory Goal: Confirm "Nutritional Risk" to prioritize benefits for at-risk women, infants, and children.`,
  
  'liheap-priority': `Target Verification: LIHEAP Priority Status (42 USC 8624).
    - Requirements: Identification of households with "high energy burden" or "vulnerable members" (elderly, disabled, children under 6).
    - Primary Documents: Utility bills showing high usage relative to income, birth certificates of children, disability award letters.
    - Statutory Goal: Prioritize energy assistance funds for those at highest risk of health/safety issues due to utility shutoff.`,
  
  'ccdf-eligibility': `Target Verification: Childcare Eligibility (45 CFR 98.20).
    - Requirements: Parents must be working or attending a job training/educational program.
    - Primary Documents: Current work schedule, school enrollment verification, or job training certificate.
    - Statutory Goal: Ensure childcare subsidies are directed to families who need them to maintain employment or education.`
};

const PERSONA_INSTRUCTIONS: Record<'client' | 'worker', string> = {
  'client': `
[PERSONA DIRECTIVE: RESIDENT NAVIGATOR]
- NEUROSYMBOLIC TRANSLATION PROTOCOL: You are a living policy engine. When asked a policy or eligibility question, you must mentally ground your answer in actual federal/state statutes.
- TEXT QUERY: Translate the strict statutory rule into an empathetic, 5th-grade reading level explanation in the "message" field. You MUST explicitly state that your answer is based on official law or program rules. Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute document evaluation from the resident's perspective. Calculate a "statutorySufficiency" score (label it "Document Readiness" in your mind) based on how likely this document is to be accepted by the agency for the selected program. Provide a "complianceNote" in plain, encouraging language (e.g., "This looks like a strong proof of address because it's a recent utility bill."). If the score is high, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
- STATUTORY GROUNDING PROTOCOL: You are a strict policy operations copilot.
- TEXT QUERY: Provide comprehensive, text-based conversational answers citing specific state or federal statutes (CFR, USC). Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute deterministic extraction. For each field, calculate the "statutorySufficiency" score based on how well the document satisfies the specific program rule (e.g., SNAP 7 CFR 273.9, Medicaid 42 CFR 435.916, WIC 7 CFR 246.7). Provide a "complianceNote" explaining the technical statutory basis for the score. If all sufficiency scores are >= 0.85, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`
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

    console.log(`[APS-SANDBOX-REQUEST] ID: ${requestId} | Persona: ${persona.toUpperCase()} | Policy: ${policyId || 'None'}`);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: userParts }
      ],
      config: {
        systemInstruction: systemInstructionOverride,
        temperature: 0.0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { 
              type: Type.STRING,
              description: "The status of the evaluation. Must be one of: PROCEED TO RULES ENGINE, REQUIRES HITL REVIEW, PENDING AGENCY REVIEW, POLICY GUIDANCE, ERROR"
            },
            message: { 
              type: Type.STRING, 
              description: "Public facing receipt or policy explanation." 
            },
            extractedData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  field: { type: Type.STRING },
                  value: { type: Type.STRING },
                  statutorySufficiency: { 
                    type: Type.NUMBER,
                    description: "Score from 0.0 to 1.0 representing how well this document satisfies the specific program statute."
                  },
                  complianceNote: {
                    type: Type.STRING,
                    description: "Explanation of why this document is sufficient or insufficient per program rules."
                  }
                },
                required: ["field", "value", "statutorySufficiency", "complianceNote"]
              }
            }
          },
          required: ["status", "message", "extractedData"]
        }
      },
    });

    const rawText = response.text || "{}";
    console.log(`[APS-SANDBOX-RESPONSE] ID: ${requestId} | Raw:`, rawText);
    
    try {
      return JSON.parse(rawText);
    } catch (parseError) {
      console.error(`[APS-SANDBOX-PARSE-ERROR] ID: ${requestId} | Raw Text:`, rawText);
      throw parseError;
    }

  } catch (error) {
    console.error(`[APS-SANDBOX-ERROR] ID: ${requestId} | Time: ${timestamp}`, error);
    return {
      status: "ERROR",
      message: "System alert: Connection timeout or JSON parse failure.",
      extractedData: []
    };
  }
}