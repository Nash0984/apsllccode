import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are a helpful AI assistant for Applied Policy Systems (APS). 
Applied Policy Systems is a professional services firm that bridges the gap between legislative intent and administrative reality.

Key Services:
1. Rules as Code (RaC): Translating subjective policy into deterministic logic for automated systems.
2. Benefit System Modernization: Helping government agencies modernize legacy systems (like SNAP, Medicaid, UI) with a focus on policy fidelity.
3. Policy Implementation Strategy: Providing frameworks for rigorous data analysis and historical context to improve service delivery.
4. Compliance & Audit: Ensuring automated systems remain compliant with evolving regulations.

Target Audiences:
- Government Agencies (State and Federal)
- GovTech Vendors
- Policy Research Organizations

Tone: Professional, precise, technical, and helpful. 
If you don't know the answer, suggest they use the contact form on the page to speak with a human expert.
Keep responses concise and focused on APS capabilities.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again or use our contact form.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later or reach out via our contact form.";
  }
}
