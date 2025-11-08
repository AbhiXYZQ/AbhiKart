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
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashedPassword });
      
      req.session.userId = user.id;
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id: user.id, username: user.username });
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
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/products/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const product = await storage.updateProduct(id, updates);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const deleted = await storage.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true });
  });

  app.get("/api/blog-posts", async (req, res) => {
    const blogPosts = await storage.getBlogPosts();
    res.json(blogPosts);
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    const { slug } = req.params;
    const blogPost = await storage.getBlogPostBySlug(slug);
    
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blogPost);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const { id } = req.params;
    const blogPost = await storage.getBlogPost(id);
    
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blogPost);
  });

  app.post("/api/blog-posts", requireAuth, async (req, res) => {
    try {
      const blogPostData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(blogPostData);
      res.status(201).json(blogPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const blogPost = await storage.updateBlogPost(id, updates);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(blogPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const deleted = await storage.deleteBlogPost(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
