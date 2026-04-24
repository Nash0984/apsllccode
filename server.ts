import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API route for contact form
  app.post("/api/contact", express.json(), (req, res) => {
    const { name, email, organization, message } = req.body;
    
    // Basic server-side validation
    if (!name || !email || !organization || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    res.json({ 
      success: true, 
      message: "Inquiry received successfully" 
    });
  });

  // MOCK CHAT ROUTE FOR LOCAL PREVIEW
  app.post("/api/chat", express.json(), (req, res) => {
    const { message } = req.body;
    
    // Simulate network delay for UI realism
    setTimeout(() => {
      res.json({ 
        reply: "This is a simulated response from your local server. When deployed to Cloudflare, this interface will connect securely to the live Gemini logic engine to process your request." 
      });
    }, 1000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // SPA fallback: Serve index.html for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});