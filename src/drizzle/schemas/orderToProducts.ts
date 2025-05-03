import { timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { OrderTable } from "./orders";
import { ProductTable } from "./products";
import { relations } from "drizzle-orm";

export const OrderToProductsTable = pgTable("order_to_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => OrderTable.id),
  productId: uuid("product_id").references(() => ProductTable.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const OrderToProductsRelations = relations(
  OrderToProductsTable,
  ({ one }) => ({
    order: one(OrderTable, {
      references: [OrderTable.id],
      fields: [OrderToProductsTable.orderId],
      relationName: "order",
    }),
    product: one(ProductTable, {
      references: [ProductTable.id],
      fields: [OrderToProductsTable.productId],
      relationName: "product",
    }),
  })
);
