import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const cuisines = pgTable("cuisines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
});

export const insertCuisineSchema = createInsertSchema(cuisines).pick({
  name: true,
  slug: true,
  imageUrl: true,
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: integer("rating").notNull(),
  priceLevel: text("price_level").notNull(),
  distance: text("distance").notNull(),
  offer: text("offer"),
  deliveryTime: text("delivery_time").notNull(),
  isFavorite: boolean("is_favorite").default(false),
});

export const insertRestaurantSchema = createInsertSchema(restaurants).pick({
  name: true,
  description: true,
  imageUrl: true,
  rating: true,
  priceLevel: true,
  distance: true,
  offer: true,
  deliveryTime: true,
  isFavorite: true,
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  restaurantId: integer("restaurant_id").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  restaurantId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCuisine = z.infer<typeof insertCuisineSchema>;
export type Cuisine = typeof cuisines.$inferSelect;

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
