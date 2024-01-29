import { Note } from '@poly/domain';
import { randomUUID } from 'crypto';
import { Database } from "./database";

const initNotes: Note[] = [
    { id: randomUUID(), text: 'Poly 1', },
    { id: randomUUID(), text: 'Poly 2', },
    { id: randomUUID(), text: 'Poly 3', },
    { id: randomUUID(), text: 'Poly 4', },
    { id: randomUUID(), text: 'Poly 5', },
    { id: randomUUID(), text: 'Poly 6', },
    { id: randomUUID(), text: 'Poly 7', },
];
export const databaseNotes = new Database(initNotes);
