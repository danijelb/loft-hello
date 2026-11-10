import { serve } from '@hono/node-server';
import { createApp } from './app.ts';
import { openDb } from './db.ts';

const port = Number(process.env.PORT ?? 3000);
const server = serve({ fetch: createApp(openDb()).fetch, port, hostname: '0.0.0.0' }, () =>
  console.log(JSON.stringify({ event: 'listening', port })),
);
process.on('SIGTERM', () => server.close(() => process.exit(0)));
