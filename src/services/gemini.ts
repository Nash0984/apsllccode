import { STATE_RULES_ONTOLOGY } from "../config/ontology";

export interface FileData {
  mimeType: string;
  data: string;
}

export async function evaluateDocument(
  fileData: FileData,
  policyId: string,
  persona: 'client' | 'worker' = 'worker'
) {
  const response = await fetch("/api/ai/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileData, policyId, persona }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Evaluation failed");
  }

  return response.json();
}

export async function routePolicyQuery(
  userMessage: string,
  availableNodes?: string
) {
  const response = await fetch("/api/ai/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage, availableNodes }),
  });

  if (!response.ok) {
    return { message: "UNKNOWN" };
  }

  return response.json();
}

export async function getConversationalResponse(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) {
  const response = await fetch("/api/ai/chat-detailed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    return "Error communicating with the conversational agent backend.";
  }

  const data = await response.json();
  return data.reply;
}

export async function extractFormalLogic(statutoryText: string) {
  const response = await fetch("/api/ai/extract-logic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ statutoryText }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Logic extraction failed");
  }

  return response.json();
}

export async function analyzeAuditTrail(log: any[]) {
  const response = await fetch("/api/ai/analyze-audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ log }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Audit analysis failed");
  }

  return response.json();
}
