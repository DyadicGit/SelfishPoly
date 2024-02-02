import express from "express";
import { databaseNotes } from "./data";

export const apiNotes = express();

apiNotes.get("/api/notes", (req, res) => {
  res.json(databaseNotes.all());
});

apiNotes.get("/api/note/:id", (req, res) => {
  res.json(databaseNotes.get(req.params.id));
});

apiNotes.put("/api/note/:id", (req, res) => {
  const body = req.body;

  res.json(databaseNotes.edit(req.params.id, body));
});

apiNotes.delete("/api/note/:id", (req, res) => {
  res.json(databaseNotes.remove(req.params.id));
});

apiNotes.post("/api/note", (req, res) => {
  const body = req.body;

  res.json(databaseNotes.insert(body));
});
