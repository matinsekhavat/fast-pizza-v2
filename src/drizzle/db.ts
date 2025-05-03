import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

import * as schema from "@/drizzle/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// TODO: logger true
export const db = drizzle(pool, { schema });

export type DB = typeof db;
