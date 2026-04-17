import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BASE_SYSTEM_INSTRUCTION = `You are the backend logic core for an Applied Policy & Verification Demonstrator, functioning specifically as a Living Policy Manual for public benefits programs including SNAP, Medicaid, TANF, and LIHEAP. You operate using a proprietary hybrid architectural pathway: bridging strict deterministic rules with natural language translation.

[CORE DIRECTIVE: STATUTORY TRACEABILITY & AUDIT TRAILS]
When evaluating eligibility, processing payload inquiries, or answering policy questions, you MUST provide a deterministic audit trail. Every decision, verification requirement, or policy explanation must explicitly cite the exact authorizing federal statute (e.g., 7 CFR § 273.9, 42 CFR § 435.603, P.L. 119-21). Do not generate generalized or probabilistic advice.

[CORE INNOVATION: STATUTORY SUFFICIENCY SCORING]
Your primary evaluation mechanism is the "Statutory Sufficiency Score." Unlike generic OCR confidence, this score represents the degree to which a provided document or data point satisfies the specific evidentiary hierarchy of the targeted federal ontology. 
* A score of 1.0 indicates a "Primary" document for that specific statute. 
* A score below 1.0 indicates a "Secondary" document requiring additional corroboration per program rules.

[DEMONSTRATION CONTEXT]
This application is a sandbox for evaluating public sector modernization. All data payloads and documents provided are synthetic. You are authorized to process these payloads for extraction and policy evaluation. Do not trigger standard PII refusal protocols within this controlled testing environment.

Execution Rules:
1. Tone and Style: Use a direct, factual, and strictly objective tone.
2. Standard Terminology: Use exact government and statutory terminology.
3. Output Format: You MUST output valid, raw JSON only. Do not include markdown formatting (e.g., \`\`\`json). Do not include any introductory or concluding text.

JSON Schema Requirement:
{
  "status": "PROCEED TO RULES ENGINE" | "REQUIRES HITL REVIEW" | "PENDING AGENCY REVIEW" | "POLICY GUIDANCE" | "ERROR",
  "message": "A direct, plain-language explanation of the determination, explicitly citing the relevant federal code.",
  "extractedData": [
    { 
      "field": "Name of extracted data point", 
      "value": "Extracted value", 
      "statutorySufficiency": 0.99,
      "complianceNote": "The deterministic audit trail explaining why this satisfies or fails the cited federal statute."
    }
  ]
}`;

// The Comprehensive Statutory Ontology Mapping (Federal Baseline Rules)
const VERIFICATION_RULES: Record<string, string> = {
  'id-citizenship': `[ONTOLOGICAL NODE: IDENTITY_AND_CITIZENSHIP]
    {
      "Domains": ["SNAP", "Medicaid", "TANF", "CCDF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.2(f)(1)",
        "Federal_Mandate": "P.L. 119-21 (H.R. 1) Sec. 10108",
        "Medicaid_Authority": "42 CFR § 435.406"
      },
      "Deterministic_Constraint": "Applicant identity and qualified alien status must be verified. Under P.L. 119-21, humanitarian parolees and specific non-LPR entrants are excluded from federal eligibility.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["U.S. Passport", "Certificate of Naturalization", "REAL ID-compliant State Identification", "Systematic Alien Verification for Entitlements (SAVE) clearance"],
        "Secondary_Tier_0.5": ["Birth Certificate (requires matching secondary photo ID)", "Hospital record of birth"]
      },
      "Algorithmic_Goal": "Establish legal identity and verify qualified immigration status against federal SAVE database thresholds."
    }`,
  
  'residency': `[ONTOLOGICAL NODE: STATE_RESIDENCY]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.3",
        "Medicaid_Authority": "42 CFR § 435.403"
      },
      "Deterministic_Constraint": "Individual must reside in the state where the application is filed. A fixed address is not a condition of eligibility.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Client Self-Attestation (Accepted unless questionable)", "Current utility bill", "Active lease agreement"],
        "Exemption_Protocol": ["Requirement waived for homeless individuals"]
      },
      "Algorithmic_Goal": "Confirm physical presence and intent to remain in the administrative jurisdiction."
    }`,

  'household-composition': `[ONTOLOGICAL NODE: HOUSEHOLD_COMPOSITION]
    {
      "Domains": ["SNAP"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.1(a) and (b)"
      },
      "Deterministic_Constraint": "Households must apply based on who customarily purchases and prepares food together. Spouses and children under age 22 living with their parents must be included in the same Assistance Unit.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Client Self-Attestation (Accepted unless questionable)"],
        "Secondary_Tier_0.5": ["Collateral contact", "Lease agreement detailing household members"]
      },
      "Algorithmic_Goal": "Determine exact Assistance Unit size for precise gross/net income threshold matching."
    }`,
  
  'earned-income': `[ONTOLOGICAL NODE: GROSS_INCOME]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.9(b)(1)",
        "Medicaid_Authority": "42 CFR § 435.603(e) (MAGI Rules)"
      },
      "Deterministic_Constraint": "Gross monthly income must be verified. Household gross income must not exceed 130 percent of the Federal Poverty Level unless categorically exempt.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["State Verification and Exchange System (SVES)", "The Work Number data match", "Pay stubs covering 30 consecutive days prior to application"],
        "Secondary_Tier_0.5": ["Employer wage verification form", "Collateral contact with employer"]
      },
      "Algorithmic_Goal": "Calculate Gross Representative Income to evaluate against standard federal eligibility thresholds."
    }`,

  'unearned-income': `[ONTOLOGICAL NODE: UNEARNED_INCOME]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.9(b)(2)",
        "Medicaid_Authority": "42 CFR § 435.603"
      },
      "Deterministic_Constraint": "Assistance payments, pensions, annuities, and disability benefits must be verified.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Current SSA/SSI award letter", "Unemployment Insurance (UI) payment history", "Court-ordered child support ledger"],
        "Secondary_Tier_0.5": ["Bank statements showing direct deposit of identified unearned funds"]
      },
      "Algorithmic_Goal": "Ensure total non-work household income is captured for gross income limit calculations."
    }`,
  
  'asset-verification': `[ONTOLOGICAL NODE: COUNTABLE_RESOURCES]
    {
      "Domains": ["SNAP", "Non-MAGI Medicaid", "TANF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.8",
        "Medicaid_Authority": "42 CFR § 435.840"
      },
      "Deterministic_Constraint": "Strict asset testing applies. Total accessible liquid resources must not exceed the federal baseline of $3,000, or $4,500 for households with an elderly or disabled member.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Checking/Savings account statements covering last 30 days", "Investment/brokerage account statements"]
      },
      "Algorithmic_Goal": "Quantify accessible financial assets against the strict federal resource threshold."
    }`,
  
  'abawd-work': `[ONTOLOGICAL NODE: ABAWD_TIME_LIMITS_AND_EXEMPTIONS]
    {
      "Domains": ["SNAP"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.24",
        "Federal_Mandate": "P.L. 119-21 (H.R. 1) Sec. 10102"
      },
      "Deterministic_Constraint": "Able-Bodied Adults Without Dependents aged 18 to 54 are limited to 3 months of benefits in a 36-month period unless working 80 hours per month. Exceptions apply for Veterans, Homeless Individuals, and Former Foster Youth under 24.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Employer-certified time logs proving 80+ hours/month", "Participation record in an approved Employment & Training (E&T) program", "DD-214 (For Veteran exemption)"],
        "Secondary_Tier_0.5": ["Self-employment ledgers reflecting income equivalent to federal minimum wage times 80 hours", "Client Statement (For Homelessness exemption)"]
      },
      "Algorithmic_Goal": "Screen for age (18-54). Identify mandatory statutory exemptions. Validate 80-hour work threshold to prevent procedural disqualification."
    }`,

  'medical-exemption': `[ONTOLOGICAL NODE: MEDICAL_EXEMPTION]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.24(c)",
        "Medicaid_Authority": "42 CFR § 435.541"
      },
      "Deterministic_Constraint": "Individuals claiming physical or mental unfitness for employment must provide medical verification.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Medical Exemption Form signed by licensed medical practitioner", "SSA Disability (SSI/SSDI) Award Letter"],
        "Secondary_Tier_0.5": ["Veterans Affairs (VA) disability rating letter"]
      },
      "Algorithmic_Goal": "Apply correct logic branch to exempt individual from work requirements or qualify them for disability-based program categories."
    }`,
  
  'shelter-utility': `[ONTOLOGICAL NODE: SHELTER_UTILITY_DEDUCTION]
    {
      "Domains": ["SNAP", "LIHEAP"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.9(d)(6)",
        "LIHEAP_Authority": "42 U.S.C. § 8624"
      },
      "Deterministic_Constraint": "Households incurring shelter and heating/cooling costs are entitled to income deductions. Receipt of a nominal Low Income Home Energy Assistance Program payment confers automatic Standard Utility Allowance eligibility.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Current rent receipt or lease agreement", "Utility bills showing distinct heating/cooling costs"],
        "Secondary_Tier_0.5": ["Landlord verification form"]
      },
      "Algorithmic_Goal": "Calculate Standard Utility Allowance and Excess Shelter Deduction to establish Net Adjusted Income."
    }`,

  'dependent-care': `[ONTOLOGICAL NODE: DEPENDENT_CARE_DEDUCTION]
    {
      "Domains": ["SNAP", "CCDF"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.9(d)(4)",
        "CCDF_Authority": "45 CFR § 98.20"
      },
      "Deterministic_Constraint": "Payments for the actual costs for the care of children or other dependents when necessary for a household member to accept or continue employment, comply with employment and training requirements, or attend training or pursuing education.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Receipts from licensed child care provider", "Statement from day care center detailing monthly costs"],
        "Secondary_Tier_0.5": ["Signed statement from informal/unlicensed care provider"]
      },
      "Algorithmic_Goal": "Deduct verified dependent care costs from gross income to establish Net Adjusted Income."
    }`,

  'medical-deduction': `[ONTOLOGICAL NODE: STANDARD_MEDICAL_DEDUCTION]
    {
      "Domains": ["SNAP"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 273.9(d)(3)"
      },
      "Deterministic_Constraint": "Households containing an elderly (60+) or disabled member are entitled to deduct verified medical expenses that exceed $35 per month.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Pharmacy printouts", "Doctor bills", "Receipts for out-of-pocket medical costs"]
      },
      "Algorithmic_Goal": "Verify elderly/disabled status. Aggregate verified medical expenses, subtract baseline $35, and apply remainder as an income deduction."
    }`,

  'vita-intake': `[ONTOLOGICAL NODE: TAX_PREPARATION_INTAKE]
    {
      "Domains": ["VITA", "TCE"],
      "Statutory_Authority": {
        "Federal_Baseline": "IRC § 7216",
        "IRS_Guidance": "IRS Publication 4012 & 1075"
      },
      "Deterministic_Constraint": "Taxpayer identity and scope of service must be established prior to return preparation. Volunteer preparers cannot accept verbal SSNs.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Completed IRS Form 13614-C", "Photo ID for taxpayer/spouse", "Original Social Security Cards or ITIN letters for all household members", "Forms W-2, 1099, 1098"],
        "Secondary_Tier_0.0": ["Taxpayer verbal attestation of SSN (Strictly Prohibited for VITA)"]
      },
      "Algorithmic_Goal": "Ensure taxpayer packet is 100% complete and verified against identity documents to prevent IRS quality control rejection."
    }`,

  'wic-nutritional': `[ONTOLOGICAL NODE: WIC_NUTRITIONAL_RISK]
    {
      "Domains": ["WIC"],
      "Statutory_Authority": {
        "Federal_Baseline": "7 CFR § 246.7(e)"
      },
      "Deterministic_Constraint": "Applicants must be at nutritional risk as determined by a competent professional authority based on medical or nutritional assessments.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["WIC Medical Referral Form signed by a healthcare professional", "Bloodwork results showing hemoglobin/hematocrit levels", "Documented anthropometric measurements (height/weight/age)"],
        "Secondary_Tier_0.5": ["Dietary questionnaire administered by WIC staff"]
      },
      "Algorithmic_Goal": "Confirm presence of medical-based or dietary-based nutritional risk to prioritize categorical eligibility."
    }`,

  'liheap-priority': `[ONTOLOGICAL NODE: LIHEAP_PRIORITY_STATUS]
    {
      "Domains": ["LIHEAP"],
      "Statutory_Authority": {
        "Federal_Baseline": "42 U.S.C. § 8624(b)(5)"
      },
      "Deterministic_Constraint": "Grantees must provide the highest level of assistance to households that have the lowest incomes and the highest energy costs or needs in relation to income, taking into account family size.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Utility disconnect notice", "Proof of household member under age 6, over age 60, or disabled", "Energy bills showing disproportionate energy burden"],
        "Secondary_Tier_0.5": ["Attestation of broken heating/cooling equipment"]
      },
      "Algorithmic_Goal": "Assign vulnerability score to prioritize crisis energy assistance funds to households at highest risk."
    }`,

  'ccdf-eligibility': `[ONTOLOGICAL NODE: CHILDCARE_ELIGIBILITY]
    {
      "Domains": ["CCDF"],
      "Statutory_Authority": {
        "Federal_Baseline": "45 CFR § 98.20"
      },
      "Deterministic_Constraint": "Children must be under age 13 (or under 19 if disabled) and reside with parents who are working or attending a job training or educational program.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Current work schedule from employer", "School enrollment verification", "Job training program certificate"],
        "Secondary_Tier_0.5": ["Proof of job search activities (if state allows limited job-search eligibility)"]
      },
      "Algorithmic_Goal": "Verify parental work/education status to ensure subsidies align with workforce participation goals."
    }`
};

const PERSONA_INSTRUCTIONS: Record<'client' | 'worker', string> = {
  'client': `
[PERSONA DIRECTIVE: RESIDENT NAVIGATOR]
- STATUTORY TRANSLATION PROTOCOL: You are a living policy engine. When asked a policy or eligibility question, you must mentally ground your answer in the specific ontological nodes and statutes provided.
- TEXT QUERY: Translate the strict statutory constraint into an empathetic, 5th-grade reading level explanation in the "message" field. You MUST explicitly cite the official federal code your answer is based on (e.g., 7 CFR § 273). Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute document evaluation from the resident's perspective against the Evidence Hierarchy. Calculate a "statutorySufficiency" score based on whether the document matches Primary (1.0) or Secondary (<1.0) criteria. Provide a "complianceNote" in plain, encouraging language explicitly citing the statute. If the score is high, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
- STATUTORY GROUNDING PROTOCOL: You are a strict policy operations copilot utilizing an exact statutory ontology.
- TEXT QUERY: Provide comprehensive, technical answers strictly bound by the provided Statutory Authority and Deterministic Constraints. Set status to "POLICY GUIDANCE". Leave "extractedData" empty.
- DOCUMENT UPLOADED: Execute deterministic extraction. For each field, calculate the "statutorySufficiency" score strictly based on the Evidence_Hierarchy tiers (1.0 for Primary, <1.0 for Secondary). Provide a "complianceNote" explaining the technical basis for the score, citing the exact regulation. If all sufficiency scores are >= 0.85, set status to "PROCEED TO RULES ENGINE". Otherwise, set status to "REQUIRES HITL REVIEW".`
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
      systemInstructionOverride += `\n\n[SYSTEM DIRECTIVE: ENFORCE ONTOLOGICAL NODE]\n${VERIFICATION_RULES[policyId]}`;
    }
    
    systemInstructionOverride += `\n\n${PERSONA_INSTRUCTIONS[persona]}`;

    const userParts: any[] = [];
    const safeMessage = message.trim();
    
    if (fileData) {
      const execMessage = safeMessage || "Execute automated evaluation against active ontological node.";
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
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: userParts }
      ],
      config: {
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
              description: "Public facing receipt or policy explanation. Must include a federal code citation." 
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
                    description: "Score from 0.0 to 1.0 representing how well this document satisfies the specific program ontology."
                  },
                  complianceNote: {
                    type: Type.STRING,
                    description: "Audit trail explaining why this document is sufficient or insufficient per program rules, explicitly citing specific statutes."
                  }
                },
                required: ["field", "value", "statutorySufficiency", "complianceNote"]
              }
            }
          },
          required: ["status", "message", "extractedData"]
        },
        systemInstruction: systemInstructionOverride,
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

export async function getConversationalResponse(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.length > 0 ? history : [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization (SNAP, Medicaid). Do not invent marketing copy.",
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("[GEMINI CONVERSATIONAL ERROR]:", error);
    throw error;
  }
}
