import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export const db = drizzle(sql);

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  text: varchar("text"),
});

export const schema = {};
