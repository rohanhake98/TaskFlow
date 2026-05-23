import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// In Vite, environment variables are accessed via import.meta.env
const dbUrl = import.meta.env.VITE_DATABASE_URL;

if (!dbUrl) {
  console.warn("VITE_DATABASE_URL is not set. Database features will not work.");
}

const sql = neon(dbUrl || "");
export const db = drizzle(sql);
