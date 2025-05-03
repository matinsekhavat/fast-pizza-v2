import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { OrderTable } from "./orders";
import { createdAt, id, updatedAt } from "../schemaHelpers";
export const UserTable = pgTable("users", {
  id,
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  orders: many(OrderTable),
}));
