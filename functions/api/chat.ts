import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const ChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system", "model"]),
      content: z.string().min(1, "Message content cannot be empty")
    })
  ).min(1, "At least one message is required"),
  temperature: z.number().min(0).max(2).optional(),
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
        error: "Invalid input", 
        details: validation.error.format() 
      }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    const validatedData = validation.data;
    const ai = new GoogleGenAI({ apiKey });

    // Map frontend roles to Gemini SDK roles (user/model)
    const formattedContents = validatedData.messages.map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are the specialized architectural consulting assistant for Applied Policy Systems LLC. Use a direct, factual, and strictly objective tone. Focus on neuro-symbolic policy engines, deterministic logic, and public benefits modernization (SNAP, Medicaid). Do not invent marketing copy.",
        temperature: validatedData.temperature || 0.2,
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
