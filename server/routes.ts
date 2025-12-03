import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all states with seller counts
  app.get("/api/states", async (req, res) => {
    try {
      const states = await storage.getAllStates();
      res.json(states);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch states" });
    }
  });

  // Get state by ID
  app.get("/api/states/:id", async (req, res) => {
    try {
      const state = await storage.getStateById(req.params.id);
      if (!state) {
        return res.status(404).json({ error: "State not found" });
      }
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch state" });
    }
  });

  // Get all sellers
  app.get("/api/sellers", async (req, res) => {
    try {
      const { state, specialty } = req.query;
      let sellers = await storage.getAllSellers();
      
      if (state && typeof state === "string") {
        sellers = await storage.getSellersByState(state);
      }
      
      if (specialty && typeof specialty === "string") {
        sellers = sellers.filter(s => s.specialties.includes(specialty));
      }
      
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sellers" });
    }
  });

  // Get seller by ID
  app.get("/api/sellers/:id", async (req, res) => {
    try {
      const seller = await storage.getSellerById(req.params.id);
      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }
      res.json(seller);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seller" });
    }
  });

  // Get sellers by state
  app.get("/api/states/:stateId/sellers", async (req, res) => {
    try {
      const sellers = await storage.getSellersByState(req.params.stateId);
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sellers for state" });
    }
  });

  // Get workshop by seller ID
  app.get("/api/sellers/:sellerId/workshop", async (req, res) => {
    try {
      const workshop = await storage.getWorkshopBySellerId(req.params.sellerId);
      if (!workshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workshop" });
    }
  });

  // Get all jewelry items
  app.get("/api/jewelry", async (req, res) => {
    try {
      const { category } = req.query;
      let items = await storage.getAllJewelryItems();
      
      if (category && typeof category === "string") {
        items = await storage.getJewelryItemsByCategory(category);
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jewelry items" });
    }
  });

  // Get jewelry item by ID
  app.get("/api/jewelry/:id", async (req, res) => {
    try {
      const item = await storage.getJewelryItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Jewelry item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jewelry item" });
    }
  });

  return httpServer;
}
