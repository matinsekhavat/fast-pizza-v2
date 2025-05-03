import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { OrderToProductsTable } from "./orderToProducts";
import { UserTable } from "./users";

export const orderEnums = ["pending", "completed", "cancelled"] as const;
export type orderStatusType = (typeof orderEnums)[number];
export const OrderStatus = pgEnum("order_status", orderEnums);

export const OrderTable = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => UserTable.id),
  orderStatus: OrderStatus("order_status").default("pending"),
  totalPrice: text("total_price").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const OrdersRelations = relations(OrderTable, ({ one, many }) => ({
  user: one(UserTable, {
    references: [UserTable.id],
    fields: [OrderTable.userId],
    relationName: "user",
  }),
  orderToProducts: many(OrderToProductsTable),
}));
