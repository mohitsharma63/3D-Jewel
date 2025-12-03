import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface JewelryItem {
  id: string;
  name: string;
  category: "rings" | "necklaces" | "earrings" | "bangles" | "bracelets" | "pendants";
  price: number;
  material: string;
  weight: string;
  description: string;
  imageUrl: string;
  model3dUrl?: string;
  inStock: boolean;
}

export interface Workshop {
  id: string;
  sellerId: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  establishedYear: number;
  teamSize: number;
  certifications: string[];
  specialties: string[];
}

export interface Seller {
  id: string;
  name: string;
  workshopName: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  thumbnailImage: string;
  yearsInBusiness: number;
  verified: boolean;
}

export interface StateData {
  id: string;
  name: string;
  sellerCount: number;
  pathD: string;
}

export const jewelryCategories = [
  { id: "rings", name: "Rings", icon: "ring" },
  { id: "necklaces", name: "Necklaces", icon: "necklace" },
  { id: "earrings", name: "Earrings", icon: "earring" },
  { id: "bangles", name: "Bangles", icon: "bangle" },
  { id: "bracelets", name: "Bracelets", icon: "bracelet" },
  { id: "pendants", name: "Pendants", icon: "pendant" },
] as const;

export const materials = [
  "Gold 22K",
  "Gold 18K",
  "Gold 14K",
  "Silver 925",
  "Platinum",
  "Diamond",
  "Ruby",
  "Emerald",
  "Sapphire",
  "Pearl",
  "Kundan",
  "Polki",
  "Meenakari",
] as const;
