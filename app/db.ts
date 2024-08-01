import { Generated, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export type Database = {
  todos: {
    id: Generated<number>;
    text: string;
  };
};

const dialect = new PostgresDialect({
  pool: new Pool({ connectionString: process.env.DATABASE_URL }),
});

export const db = new Kysely<Database>({
  dialect,
});
