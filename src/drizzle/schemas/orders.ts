import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { OrderToProductsTable } from "./orderToProducts";
import { UserTable } from "./users";
import { createdAt, id, updatedAt } from "../schemaHelpers";

// Define string array for type usage
export const orderEnums = ["pending", "completed", "cancelled"] as const;
export type orderStatusType = (typeof orderEnums)[number];

// Create the enum - make sure this gets properly exported and used in migrations
export const OrderStatus = pgEnum("order_status", orderEnums);

export const OrderTable = pgTable("orders", {
  id,
  userId: uuid("user_id").references(() => UserTable.id),
  // Use the enum type properly
  orderStatus: OrderStatus("order_status").default("pending").notNull(),
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
