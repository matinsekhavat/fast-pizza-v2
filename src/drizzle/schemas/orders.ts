import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { OrderToProductsTable } from "./orderToProducts";
import { UserTable } from "./users";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const orderEnums = ["pending", "completed", "cancelled"] as const;
export type orderStatusType = (typeof orderEnums)[number];
export const OrderStatus = pgEnum("order_status", orderEnums);

export const OrderTable = pgTable("orders", {
  id,
  userId: uuid("user_id").references(() => UserTable.id),
  orderStatus: OrderStatus("order_status").default("pending"),
  totalPrice: text("total_price").notNull(),
  createdAt,
  updatedAt,
});

export const OrdersRelations = relations(OrderTable, ({ one, many }) => ({
  user: one(UserTable, {
    references: [UserTable.id],
    fields: [OrderTable.userId],
    relationName: "user",
  }),
  orderToProducts: many(OrderToProductsTable),
}));
