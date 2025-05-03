import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { OrderTable } from "./orders";
import { ProductTable } from "./products";
import { relations } from "drizzle-orm";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const OrderToProductsTable = pgTable("order_to_products", {
  id,
  orderId: uuid("order_id").references(() => OrderTable.id),
  productId: uuid("product_id").references(() => ProductTable.id),
  createdAt,
  updatedAt,
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
