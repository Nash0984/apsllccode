import { z } from "zod";

const HealthQuerySchema = z.object({
  verbose: z.string().optional().transform(val => val === "true"),
});

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  const validation = HealthQuerySchema.safeParse(queryParams);
  
  const responseData: any = { 
    status: "ok", 
    platform: "Cloudflare Pages",
    timestamp: new Date().toISOString() 
  };

  if (validation.success && validation.data.verbose) {
    responseData.runtime = "Cloudflare Workers";
  }

  return new Response(JSON.stringify(responseData), {
    headers: { "content-type": "application/json" }
  });
}
