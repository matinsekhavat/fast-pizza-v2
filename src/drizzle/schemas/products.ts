import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { OrderToProductsTable } from "./orderToProducts";

export const ProductTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  ingredients: text("ingredients").array(),
  name: text("name").notNull(),
  soldOut: boolean().notNull().default(false),
  unitPrice: text("unit_price").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const ProductRelations = relations(ProductTable, ({ many }) => ({
  orderToProducts: many(OrderToProductsTable),
}));

export type ProductType = typeof ProductTable.$inferSelect;
