import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

export type Note = {
  localId?: string;
  body?: string;
  createdAt?: Date;
};

interface EngramDB extends DBSchema {
  notes: {
    value: Note;
    key: string;
  };
}

let _db: Promise<IDBPDatabase<EngramDB>> | null = null;

export function getDb() {
  if (_db) {
    return _db;
  }

  _db = openDB<EngramDB>("engram-db", 1, {
    upgrade(db, oldVersion, newVersion) {
      if (oldVersion < 1) {
        const notesStore = db.createObjectStore("notes", {
          keyPath: "localId",
        });
      }
    },
  });

  return _db;
}

export async function addNote(value: EngramDB["notes"]["value"]) {
  const db = await getDb();

  const localId = uuidv4();
  const date = new Date();
  const addedNote = { ...value, localId, createdAt: date };
  await db.add("notes", addedNote);
  return addedNote;
}

export async function getAllNotes() {
  const db = await getDb();
  return db.getAll("notes");
}