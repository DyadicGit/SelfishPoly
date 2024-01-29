import { resolve } from "./utils";
import { Note } from "@poly/domain";

const HOST = "http://localhost:5000";

export const apiGetNotes = () => {
  return fetch(`${HOST}/api/notes`, {
    method: "GET",
    headers: { accept: "application/json" },
  }).then<Note[]>(resolve);
};
