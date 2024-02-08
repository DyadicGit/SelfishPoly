import { randomUUID } from "crypto";

type Id = string;
type BaseEntry = { id: Id };

export class Database<Entry extends BaseEntry> {
  private readonly database: Entry[];

  constructor(entries?: Entry[]) {
    this.database = entries || [];
  }
  public all() {
    return this.database;
  }

  public get(id: Id) {
    return this.database.find((s) => s.id === id) || null;
  }

  public insert(entry: Omit<Entry, "id">) {
    this.database.push({ ...entry, id: randomUUID() } as Entry);
    return this.database;
  }

  public edit(id: Id, entry: Partial<Entry>) {
    const existingEntry = this.database.find((s) => s.id === id);
    if (existingEntry) {
      Object.assign(existingEntry, entry);
    }
    return this.database;
  }

  public remove(id: Entry["id"]) {
    const entryIdx = this.database.findIndex((s) => s.id === id);
    this.database.splice(entryIdx, 1);
    return this.database;
  }
}
