import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { db } from '../lib/db';
import { tasks } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

const app = new Hono();

// Validation Schema
const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  time: z.string().optional(),
  itemType: z.enum(['Task', 'Reminder']),
  category: z.enum(['Focus', 'Meeting', 'Personal', 'Work']),
  scheduledDate: z.string().optional().nullable(),
});

// GET / - Fetch user tasks
app.get('/', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const userTasks = await db.select().from(tasks).where(eq(tasks.userId, auth.userId));
    return c.json(userTasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return c.json({ error: 'Failed to fetch tasks' }, 500);
  }
});

// POST / - Create task
app.post('/', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  const body = await c.req.json();
  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid data', details: result.error.format() }, 400);
  }

  try {
    const [newTask] = await db.insert(tasks).values({
      id: crypto.randomUUID(),
      userId: auth.userId,
      ...result.data,
      scheduledDate: result.data.scheduledDate ? new Date(result.data.scheduledDate) : null,
    }).returning();

    return c.json(newTask);
  } catch (error) {
    console.error("Create task error:", error);
    return c.json({ error: 'Failed to create task' }, 500);
  }
});

// PATCH /:id - Update task (e.g., reschedule)
app.patch('/:id', clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401);

  const taskId = c.req.param('id');
  const body = await c.req.json();
  
  // We only validate what's provided since it's a partial update
  const partialTaskSchema = taskSchema.partial();
  const result = partialTaskSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid data', details: result.error.format() }, 400);
  }

  try {
    const updateData: Partial<typeof tasks.$inferInsert> = { ...result.data };
    if (updateData.scheduledDate !== undefined) {
       updateData.scheduledDate = updateData.scheduledDate ? new Date(updateData.scheduledDate) : null;
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, auth.userId)))
      .returning();

    if (!updatedTask) return c.json({ error: 'Task not found' }, 404);

    return c.json(updatedTask);
  } catch (error) {
    console.error("Update task error:", error);
    return c.json({ error: 'Failed to update task' }, 500);
  }
});

export default app;
