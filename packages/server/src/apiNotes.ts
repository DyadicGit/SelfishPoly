import express from "express";
import { RequestHandler } from "express";
import { databaseNotes } from "./data";
import { KnownError, Note } from "@poly/domain";

type IdParam = { id: string };

const selfishPolyValidator: RequestHandler<
  IdParam | unknown,
  KnownError,
  Note
> = (req, res, next) => {
  const note = req.body;
  const culprit = (req.params as IdParam).id || note.id;
  if (!note?.text) {
    return res.status(400).json({ message: "NO Poly at ALL!!!", culprit });
  }
  if (/Poly/.test(note.text)) {
    return next();
  }
  return res.status(400).json({ message: "NO Poly !!", culprit });
};

export const apiNotes = express();

apiNotes.get("/api/notes", (req, res) => {
  res.json(databaseNotes.all());
});

apiNotes.get<IdParam>("/api/note/:id", (req, res) => {
  res.json(databaseNotes.get(req.params.id));
});

apiNotes.put<IdParam, Note[] | KnownError, Note>(
  "/api/note/:id",
  selfishPolyValidator,
  (req, res) => {
    const body = req.body;

    res.json(databaseNotes.edit(req.params.id, body));
  }
);

apiNotes.delete<IdParam, Note[]>("/api/note/:id", (req, res) => {
  res.json(databaseNotes.remove(req.params.id));
});

apiNotes.post<unknown, Note[] | KnownError, Note>(
  "/api/note",
  selfishPolyValidator,
  (req, res) => {
    const body = req.body;

    res.json(databaseNotes.insert(body));
  }
);
