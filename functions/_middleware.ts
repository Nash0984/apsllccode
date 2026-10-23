import { ALLOWED_ORIGINS } from "../src/config/cors.ts";

export async function onRequestOptions(context: any) {
  const { request } = context;
  const origin = request.headers.get("Origin");

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return new Response(null, {
    status: 204,
    headers
  });
}

export async function onRequest(context: any) {
  const { request, next } = context;
  const origin = request.headers.get("Origin");

  const response = await next();
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Vary", "Origin");

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    newHeaders.set("Access-Control-Allow-Origin", origin);
    newHeaders.set("Access-Control-Allow-Credentials", "true");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
