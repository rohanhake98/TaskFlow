import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// @hono/clerk-auth looks for these specific keys without the VITE_ prefix
process.env.CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;
// Note: Secretary key should already be in process.env from dotenv, but we ensure it's mapped correctly
process.env.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || "";

if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
  console.warn("WARNING: Clerk keys are missing in the backend environment. Auth will fail.");
} else {
  console.log("Clerk keys loaded successfully in backend.");
}

import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import tasksApp from './tasks';
import notesApp from './notes';

const app = new Hono();

// Route groups
app.route('/tasks', tasksApp);
app.route('/notes', notesApp);

// Health check
app.get('/health', (c) => c.text('API is healthy'));

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
