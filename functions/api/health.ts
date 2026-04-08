export async function onRequest(context) {
  return new Response(JSON.stringify({ 
    status: "ok", 
    platform: "Cloudflare Pages",
    timestamp: new Date().toISOString() 
  }), {
    headers: { "content-type": "application/json" }
  });
}
