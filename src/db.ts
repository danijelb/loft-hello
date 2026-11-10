import { DatabaseSync } from 'node:sqlite';

/** SQLite lives at $DATA_DIR/app.db, the app's only writable place (contract rule 6). */
export function openDb(path = `${process.env.DATA_DIR ?? './data'}/app.db`) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
  return db;
}

export type Db = DatabaseSync;
