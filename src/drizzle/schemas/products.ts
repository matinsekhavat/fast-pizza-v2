import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { OrderToProductsTable } from "./orderToProducts";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const ProductTable = pgTable("products", {
  id,
  imageUrl: text("image_url").notNull(),
  ingredients: text("ingredients").array(),
  name: text("name").notNull(),
  soldOut: boolean().notNull().default(false),
  unitPrice: text("unit_price").notNull(),
  createdAt,
  updatedAt,
});

export const ProductRelations = relations(ProductTable, ({ many }) => ({
  orderToProducts: many(OrderToProductsTable),
}));

export type ProductType = typeof ProductTable.$inferSelect;
