import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { db } from '../lib/db';
import { notes } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';

const app = new Hono();

const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  isPinned: z.boolean().optional(),
});

// GET / - Fetch user notes
app.get('/', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const userNotes = await db.select()
      .from(notes)
      .where(eq(notes.userId, auth.userId))
      .orderBy(desc(notes.updatedAt));
    return c.json(userNotes);
  } catch (error) {
    console.error("Fetch notes error:", error);
    return c.json({ error: 'Failed to fetch notes' }, 500);
  }
});

// POST / - Create note
app.post('/', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  const body = await c.req.json();
  const result = noteSchema.safeParse(body);

  if (!result.success) return c.json({ error: 'Invalid data' }, 400);

  try {
    const [newNote] = await db.insert(notes).values({
      id: crypto.randomUUID(),
      userId: auth.userId,
      ...result.data,
    }).returning();
    return c.json(newNote);
  } catch (error) {
    console.error("Create note error:", error);
    return c.json({ error: 'Failed to create note' }, 500);
  }
});

// PATCH /:id - Update note
app.patch('/:id', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  const noteId = c.req.param('id');
  const body = await c.req.json();
  const result = noteSchema.partial().safeParse(body);

  if (!result.success) return c.json({ error: 'Invalid data' }, 400);

  try {
    const [updatedNote] = await db
      .update(notes)
      .set({ ...result.data, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, auth.userId)))
      .returning();

    if (!updatedNote) return c.json({ error: 'Note not found' }, 404);
    return c.json(updatedNote);
  } catch (error) {
    console.error("Update note error:", error);
    return c.json({ error: 'Failed to update note' }, 500);
  }
});

export default app;
