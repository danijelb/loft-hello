import { Hono } from 'hono';
import type { Db } from './db.ts';

export function createApp(db: Db) {
  const app = new Hono();

  // Contract rule 2: 200 within 2 s once ready, and it touches the database.
  app.get('/health', (c) => {
    try {
      db.prepare('SELECT count(*) FROM visits').get();
      return c.json({ status: 'ok' });
    } catch (err) {
      return c.json({ status: 'error', error: (err as Error).message }, 503);
    }
  });

  app.get('/', (c) => {
    const { id } = db.prepare('INSERT INTO visits (at) VALUES (?) RETURNING id').get(new Date().toISOString()) as { id: number };
    return c.text(`Hello from ${process.env.APP_NAME ?? 'hello'} on Loft — visit #${id}\n`);
  });

  return app;
}
