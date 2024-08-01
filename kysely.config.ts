import { defineConfig } from "kysely-ctl";
import { db } from "./app/db";

export default defineConfig({
  kysely: db,
});
