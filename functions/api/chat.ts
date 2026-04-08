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
    // In a real app, you'd use the @google/genai SDK here.
    // Note: Cloudflare Workers environment might require specific SDK versions or fetch-based calls.
    
    return new Response(JSON.stringify({ 
      message: "Cloudflare Pages Gemini endpoint ready",
      received: body 
    }), {
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
}
