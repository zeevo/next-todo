import { defineConfig } from "kysely-ctl";
import { db } from "./src/app/db";

export default defineConfig({
  kysely: db,
});
