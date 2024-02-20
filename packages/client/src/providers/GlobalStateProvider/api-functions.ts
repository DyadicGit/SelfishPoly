import { resolve } from '../utils';
import { Note } from '@poly/domain';
import { SERVER_PORT } from '../host';

const HOST = `http://localhost:${SERVER_PORT}`;

export const apiGetNotes = () => {
  return fetch(`${HOST}/api/notes`, {
    method: 'GET',
    headers: { accept: 'application/json' },
  }).then<Note[]>(resolve);
};

export const apiEditNote = (note: Note) => {
  return fetch(`${HOST}/api/note/${note.id}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }).then<Note[]>(resolve);
};

export const apiDeleteNote = (id: Note['id']) => {
  return fetch(`${HOST}/api/note/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  }).then<Note[]>(resolve);
};

export const apiNewNote = (note: Pick<Note, 'text'>) => {
  return fetch(`${HOST}/api/note`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }).then<Note[]>(resolve);
};
