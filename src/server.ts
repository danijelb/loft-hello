import { serve } from '@hono/node-server';
import { createApp } from './app.ts';
import { openDb } from './db.ts';

const port = 8080; // BUG on purpose: ignores $PORT (Loft M1 exit test)
const server = serve({ fetch: createApp(openDb()).fetch, port, hostname: '0.0.0.0' }, () =>
  console.log(JSON.stringify({ event: 'listening', port })),
);
process.on('SIGTERM', () => server.close(() => process.exit(0)));
