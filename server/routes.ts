import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertBlogPostSchema, insertUserSchema } from "@shared/schema";
import bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    // ... (aapka register code)
  });

  app.post("/api/auth/login", async (req, res) => {
    // ... (aapka login code)
  });

  app.post("/api/auth/logout", (req, res) => {
    // ... (aapka logout code)
  });

  app.get("/api/auth/user", async (req, res) => {
    // ... (aapka auth user code)
  });

  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    const { category } = req.params;
    const products = await storage.getProductsByCategory(category);
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await storage.getProduct(id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  });

  app.post("/api/products", requireAuth, async (req, res) => {
    // ... (aapka create product code)
  });

  app.patch("/api/products/:id", requireAuth, async (req, res) => {
    // ... (aapka update product code)
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const deleted = await storage.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true });
  });

  // [!!!] NAYA SEARCH ROUTE [!!!]
  app.get("/api/search", async (req, res) => {
    const query = req.query.q as string;

    if (!query) {
      // Agar 'q' parameter nahi hai, toh empty array return karein
      return res.json([]);
    }

    try {
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      console.error("Search failed:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });
  // [!!!] NAYA ROUTE YAHAN KHATM HOTA HAI [!!!]

  app.get("/api/blog-posts", async (req, res) => {
    const blogPosts = await storage.getBlogPosts();
    res.json(blogPosts);
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    // ... (aapka blog slug code)
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    // ... (aapka blog id code)
  });

  app.post("/api/blog-posts", requireAuth, async (req, res) => {
    // ... (aapka create blog code)
  });

  app.patch("/api/blog-posts/:id", requireAuth, async (req, res) => {
    // ... (aapka update blog code)
  });

  app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
    // ... (aapka delete blog code)
  });

  const httpServer = createServer(app);

  return httpServer;
}
