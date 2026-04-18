import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const ChatSchema = z.object({
  message: z.string().min(1, "Message content cannot be empty"),
  history: z.array(
    z.object({
      role: z.enum(["user", "model", "assistant", "system"]),
      parts: z.array(z.object({ text: z.string() }))
    })
  ).optional(),
});

export async function onRequestPost(context: any) {
  const { env, request } = context;
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GEMINI_API_KEY is missing from server environment" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }

  try {
    const body = await request.json();
    const validation = ChatSchema.safeParse(body);
    
    if (!validation.success) {
      return new Response(JSON.stringify({ 
        error: "Invalid input schema", 
        details: validation.error.format() 
      }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    const validatedData = validation.data;
    const ai = new GoogleGenAI({ apiKey });

    let formattedContents = [];
    if (validatedData.history && validatedData.history.length > 0) {
      formattedContents = validatedData.history.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: m.parts
      }));
    } else {
      formattedContents = [{ role: 'user', parts: [{ text: validatedData.message }] }];
    }

    // Upgraded to the current Gemini 3 Flash model
    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: formattedContents as any,
      config: {
        systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization. Do not invent marketing copy. If a user wishes to schedule a consultation, ask them to provide their Name, Organization, and Work Email.",
        temperature: 0.2,
      }
    });

    return new Response(JSON.stringify({ response: response.text }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });

  } catch (error: any) {
    console.error("[CHAT ENDPOINT ERROR]:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}