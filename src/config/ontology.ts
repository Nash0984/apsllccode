// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ExtractedField {
  field: string;
  value: string;
  statutorySufficiency: number;
  complianceNote: string;
}

export interface StateRuleNode {
  ruleId: string;
  statute: string;
  explanation: string;
  procedure: string[];
}

export interface VerificationProtocol {
  id: string;
  workerLabel: string;
  clientLabel: string;
  statutoryDetail: string;
}

export interface VerificationDomain {
  workerCategory: string;
  clientCategory: string;
  protocols: VerificationProtocol[];
}

// ============================================================================
// UI CONFIGURATIONS (Used by Sandbox and Extraction Engine)
// ============================================================================

export const UNIFIED_VERIFICATION_ONTOLOGY: VerificationDomain[] = [
  {
    workerCategory: "1.0 Demographics & Identity",
    clientCategory: "Personal Information",
    protocols: [
      { id: 'id-citizenship', workerLabel: '1.1 Identity & Citizenship (6 CFR Part 37)', clientLabel: 'ID or Citizenship Documents', statutoryDetail: 'Governed by the REAL ID Act (6 CFR Part 37), requiring state-issued IDs to meet specific security standards for federal recognition. SNAP/Medicaid rules (7 CFR 273.2) further mandate verification of identity for all applicants.' },
      { id: 'residency', workerLabel: '1.2 Residency Verification (42 CFR 435.403)', clientLabel: 'Proof of Address', statutoryDetail: '42 CFR 435.403 defines state residence for Medicaid. For SNAP, 7 CFR 273.2(f)(1)(vi) requires verification of residency, typically through documents showing the intent to remain in the state.' }
    ]
  },
  {
    workerCategory: "2.0 Financial Means Testing",
    clientCategory: "Income & Assets",
    protocols: [
      { id: 'earned-income', workerLabel: '2.1 Earned Income (7 CFR 273.9 / 42 CFR 435.603)', clientLabel: 'Pay Stubs or Proof of Income', statutoryDetail: '7 CFR 273.9 defines countable earned income for SNAP. 42 CFR 435.603 establishes the Modified Adjusted Gross Income (MAGI) methodology for Medicaid eligibility.' },
      { id: 'unearned-income', workerLabel: '2.2 Unearned Income (7 CFR 273.9(c))', clientLabel: 'Unemployment or SSI Letters', statutoryDetail: 'Covers income not derived from employment, such as Social Security, Unemployment Insurance, and Child Support. 7 CFR 273.9(c) lists specific exclusions and inclusions.' },
      { id: 'asset-verification', workerLabel: '2.3 Resource & Asset Test (7 CFR 273.8)', clientLabel: 'Bank Statements', statutoryDetail: '7 CFR 273.8 sets the resource limits for SNAP households. While many states have implemented Broad-Based Categorical Eligibility (BBCE) to waive asset tests, it remains a federal requirement for certain populations.' }
    ]
  },
  {
    workerCategory: "3.0 Statutory Compliance",
    clientCategory: "Work & Medical Info",
    protocols: [
      { id: 'abawd-work', workerLabel: '3.1 Work Compliance Logs (7 CFR 273.24)', clientLabel: 'Work Hours Log', statutoryDetail: '7 CFR 273.24 outlines the time limit and work requirements for Able-Bodied Adults Without Dependents (ABAWDs), requiring 80 hours of work or qualifying activity per month.' },
      { id: 'medical-exemption', workerLabel: '3.2 Medical Exemption (42 CFR 435.541)', clientLabel: 'Medical Exemption Form', statutoryDetail: '42 CFR 435.541 provides the framework for state agencies to determine disability status for Medicaid eligibility when not already established by the Social Security Administration.' }
    ]
  },
  {
    workerCategory: "4.0 Deductions & Expenses",
    clientCategory: "Household Expenses",
    protocols: [
      { id: 'shelter-utility', workerLabel: '4.1 Shelter/Utility Costs (7 CFR 273.9(d))', clientLabel: 'Utility Bills or Rent Receipts', statutoryDetail: '7 CFR 273.9(d)(6) allows for deductions of excess shelter costs and standard utility allowances (SUA) to determine net income for SNAP eligibility.' },
      { id: 'dependent-care', workerLabel: '4.2 Dependent Care (7 CFR 273.9(d))', clientLabel: 'Child Care Expenses', statutoryDetail: '7 CFR 273.9(d)(4) allows a deduction for payments for the actual costs for the care of children or other dependents when necessary for a household member to accept or continue employment.' }
    ]
  }
];

export const LOGIC_PIPELINES = [
  { id: "financial", label: "Financial Means Testing", statute: "7 CFR § 273.9", status: "online" },
  { id: "work", label: "ABAWD Work Compliance", statute: "7 CFR § 273.24", status: "online" },
  { id: "tax", label: "IRS 1075 Privacy Isolation", statute: "IRC § 7216", status: "standby" }
];

// ============================================================================
// PROTOTYPE 01 & 03: DOCUMENT EVALUATION ONTOLOGY (Used by Gemini API)
// ============================================================================

export const VERIFICATION_RULES: Record<string, string> = {
  'earned-income': `[ONTOLOGICAL NODE: GROSS_INCOME]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": { "Federal_Baseline": "7 CFR § 273.9(b)(1)", "Medicaid_Authority": "42 CFR § 435.603(e) (MAGI Rules)" },
      "Deterministic_Constraint": "Gross monthly income must be verified. Household gross income must not exceed 130 percent of the Federal Poverty Level.",
      "Evidence_Hierarchy": { 
        "Primary_Tier_1.0": ["State Verification and Exchange System (SVES)", "Pay stubs covering 30 consecutive days"],
        "Secondary_Tier_0.5": ["Employer statement", "W-2 from previous tax year"]
      }
    }`,
  'id-citizenship': `[ONTOLOGICAL NODE: IDENTITY_AND_CITIZENSHIP]
    {
      "Domains": ["Medicaid", "SNAP"],
      "Statutory_Authority": { "Federal_Baseline": "42 CFR § 435.406" },
      "Deterministic_Constraint": "Applicant must provide definitive proof of identity and U.S. citizenship or eligible immigration status.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["U.S. Passport", "Certificate of Naturalization"],
        "Secondary_Tier_0.5": ["State Driver's License combined with U.S. Birth Certificate"]
      }
    }`,
  'residency': `[ONTOLOGICAL NODE: STATE_RESIDENCY]
    {
      "Domains": ["SNAP", "Medicaid", "TANF"],
      "Statutory_Authority": { "Federal_Baseline": "7 CFR § 273.3" },
      "Deterministic_Constraint": "Individual must reside in the state where the application is filed.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Client Self-Attestation (Accepted unless questionable)", "Current utility bill", "Active lease agreement"]
      }
    }`,
  'asset-verification': `[ONTOLOGICAL NODE: COUNTABLE_RESOURCES]
    {
      "Domains": ["SNAP", "Non-MAGI Medicaid", "TANF"],
      "Statutory_Authority": { "Federal_Baseline": "7 CFR § 273.8" },
      "Deterministic_Constraint": "Strict asset testing applies. Total accessible liquid resources must not exceed the federal baseline of $3,000, or $4,500 for households with an elderly/disabled member.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Checking/Savings account statements covering last 30 days", "Investment/brokerage account statements"]
      }
    }`,
  'abawd-work': `[ONTOLOGICAL NODE: ABAWD_TIME_LIMITS_AND_EXEMPTIONS]
    {
      "Domains": ["SNAP"],
      "Statutory_Authority": { "Federal_Baseline": "7 CFR § 273.24" },
      "Deterministic_Constraint": "Able-Bodied Adults Without Dependents aged 18 to 54 are limited to 3 months of benefits in a 36-month period unless working 80 hours per month.",
      "Evidence_Hierarchy": {
        "Primary_Tier_1.0": ["Employer-certified time logs proving 80+ hours/month", "DD-214 (For Veteran exemption)"]
      }
    }`
};

// ============================================================================
// PROTOTYPE 02: DETERMINISTIC POLICY ROUTING ONTOLOGY (Used by Policy Manual)
// ============================================================================

export const STATE_RULES_ONTOLOGY: Record<string, StateRuleNode> = {
  "SNAP-INC-05": {
    ruleId: "SNAP-INC-05",
    statute: "7 CFR 273.10(c)(2)(i)",
    explanation: "Anticipated income must incorporate fluctuating overtime by averaging the amounts received over the past 30 days, unless a permanent change in hours is verified by the employer.",
    procedure: [
      "Collect and review the consecutive pay stubs from the preceding 30-day period.",
      "Calculate the average of the fluctuating overtime or shift differential amounts.",
      "Add the averaged overtime amount to the base anticipated income calculation.",
      "Log the calculation methodology in the case notes to establish the audit trail."
    ]
  },
  "SNAP-STU-12": {
    ruleId: "SNAP-STU-12",
    statute: "7 CFR 273.5(b)",
    explanation: "College students enrolled half-time or more are ineligible for SNAP unless they meet a federal exemption.",
    procedure: [
      "Request verification of enrollment status from the educational institution.",
      "Evaluate the student against exemptions: working 20 hours/week, participating in federal work-study, or caring for a dependent child.",
      "If an exemption is verified, log the specific exemption code prior to income calculation."
    ]
  },
  "SNAP-DED-01": {
    ruleId: "SNAP-DED-01",
    statute: "7 CFR 273.9(d)(6)(iii)",
    explanation: "Households that incur heating or cooling costs separate from their rent are entitled to the Standard Utility Allowance (SUA).",
    procedure: [
      "Verify the household is billed for heating or cooling costs.",
      "If verified, apply the state-specific SUA multiplier to the shelter deduction calculation.",
      "Do not request exact utility bills if the household qualifies for the mandated SUA threshold."
    ]
  }
};

// ============================================================================
// SYSTEM INSTRUCTIONS
// ============================================================================

export const PERSONA_INSTRUCTIONS: Record<'client' | 'worker', string> = {
  'client': `
[PERSONA DIRECTIVE: RESIDENT NAVIGATOR]
- TEXT QUERY: Translate strict statutory constraints into empathetic, 5th-grade reading level explanations. Explicitly cite the official federal code.
- DOCUMENT UPLOADED: Calculate a "statutorySufficiency" score based on whether the document matches Primary (1.0) or Secondary (<1.0) criteria. Provide a "complianceNote" in plain, encouraging language explicitly citing the statute.`,
  
  'worker': `
[PERSONA DIRECTIVE: ELIGIBILITY WORKER]
- TEXT QUERY: Provide comprehensive, technical answers strictly bound by the Statutory Authority. 
- DOCUMENT UPLOADED: Execute deterministic extraction. Calculate the "statutorySufficiency" score strictly based on the Evidence_Hierarchy tiers (1.0 for Primary, <1.0 for Secondary). Provide a "complianceNote" explaining the technical basis for the score, citing the exact regulation.`
};