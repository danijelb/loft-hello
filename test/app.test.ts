import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeEach, test } from 'node:test';
import { createApp } from '../src/app.ts';
import { openDb } from '../src/db.ts';
import { migrate } from '../src/migrate.ts';

let app: ReturnType<typeof createApp>;
beforeEach(() => {
  const db = openDb(join(mkdtempSync(join(tmpdir(), 'hello-')), 'app.db'));
  migrate(db);
  app = createApp(db);
});

test('GET /health touches the database and returns 200', async () => {
  const res = await app.request('/health');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('GET /health returns 503 when the database is unusable', async () => {
  const db = openDb(':memory:'); // never migrated: the visits table is missing
  const res = await createApp(db).request('/health');
  assert.equal(res.status, 503);
});

test('GET / counts visits in SQLite', async () => {
  assert.match(await (await app.request('/')).text(), /visit #1/);
  assert.match(await (await app.request('/')).text(), /visit #2/);
});

test('migrate is safe to run twice (expand-only)', () => {
  const db = openDb(':memory:');
  migrate(db);
  migrate(db);
});
