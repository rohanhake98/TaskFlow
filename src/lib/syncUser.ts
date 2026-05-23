import { db } from './db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function syncUserToDb(userId: string, email: string, name: string) {
  try {
    // Check if user already exists in our Neon DB
    const existing = await db.select().from(users).where(eq(users.id, userId));
    
    if (existing.length === 0) {
      // If not, insert them
      await db.insert(users).values({
        id: userId,
        email: email,
        name: name,
      });
      console.log("User synced to Neon DB successfully.");
    } else {
      console.log("User already exists in Neon DB.");
    }
  } catch (error) {
    console.error("Error syncing user to Neon DB:", error);
  }
}
