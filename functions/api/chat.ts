import { z } from "zod";

const ChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1, "Message content cannot be empty")
    })
  ).min(1, "At least one message is required"),
  temperature: z.number().min(0).max(2).optional(),
});

export async function onRequestPost(context) {
  const { env, request } = context;
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not set" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }

  try {
    const body = await request.json();
    
    // Validate input
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

    // In a real app, you'd use the @google/genai SDK here with validatedData.
    
    return new Response(JSON.stringify({ 
      message: "Cloudflare Pages Gemini endpoint ready",
      received: validatedData 
    }), {
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
}
