import { openDb, type Db } from './db.ts';

/**
 * Expand-only migrations: add tables and columns, never drop or rename in the same deploy
 * (the previous version must keep working). Loft runs this as a one-shot before each deploy.
 */
export function migrate(db: Db) {
  db.exec(`CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL)`);
}

if (import.meta.main) {
  migrate(openDb());
  console.log(JSON.stringify({ event: 'migrated' }));
}
