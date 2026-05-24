import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables if running in Node.js (backend)
if (typeof process !== 'undefined') {
  dotenv.config({ path: '.env.local' });
}

// Support both Vite (import.meta.env) and Node.js (process.env)
const dbUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DATABASE_URL) || 
              (typeof process !== 'undefined' && process.env?.DATABASE_URL);

if (!dbUrl) {
  console.warn("Database URL is not set. Persistence features will not work.");
}

// Only initialize if we have a URL, otherwise use a placeholder to prevent hard crash
const sql = dbUrl ? neon(dbUrl) : ((() => { throw new Error("Neon DB URL missing"); }) as unknown as ReturnType<typeof neon>);
export const db = drizzle(sql);
