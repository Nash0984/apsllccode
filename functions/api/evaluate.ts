import { GoogleGenAI, Type } from "@google/genai";
import { VERIFICATION_RULES, PERSONA_INSTRUCTIONS } from "../../src/config/ontology";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    const ai = new GoogleGenAI({ apiKey: String(env.GEMINI_API_KEY || "") });
    const payload = await request.json().catch(() => ({}));
    const { fileData, policyId, persona, type, userMessage, availableNodes } = payload;

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is missing" }), { status: 500 });
    }

    if (type === 'evaluate') {
      let systemInstructionOverride = "You are the backend logic core for an Applied Policy Systems environment. You operate using a hybrid architectural pathway: bridging strict deterministic rules with natural language translation.\n\n[CORE DIRECTIVE: STATUTORY TRACEABILITY & AUDIT TRAILS]\nYou MUST provide a deterministic audit trail. Every decision, verification requirement, or policy explanation must explicitly cite the exact authorizing federal statute. Do not generate generalized or probabilistic advice.\n\n[CORE INNOVATION: STATUTORY SUFFICIENCY SCORING]\nYour primary evaluation mechanism is the \"Statutory Sufficiency Score.\" This score represents the degree to which a provided document or data point satisfies the specific evidentiary hierarchy of the targeted federal ontology.\n* A score of 1.0 indicates a \"Primary\" document for that specific statute.\n* A score below 1.0 indicates a \"Secondary\" document requiring additional corroboration per program rules.";
      
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

      return new Response(response.text, { headers: { "Content-Type": "application/json" } });
    }

    if (type === 'route') {
      const routingPrompt = `
        [SYSTEM OVERRIDE: NEURAL ROUTING LAYER]
        You are a semantic router for a state benefits ontology. 
        Available Rule Nodes: ${availableNodes}.
        User Query: "${userMessage}"
        Identify the single most applicable Rule Node for this query. 
        Output ONLY the exact Rule Node string. If no match is found, output "UNKNOWN".
      `;

      const ROUTING_SCHEMA = {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING }
        },
        required: ["message"]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: routingPrompt }] }],
        config: {
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: ROUTING_SCHEMA,
        },
      });

      return new Response(response.text, { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Invalid request type" }), { status: 400 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}