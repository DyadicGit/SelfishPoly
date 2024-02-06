import React from "react";
import s from "./chat.module.scss";

const socket = new WebSocket("ws://localhost:5000");

socket.addEventListener("open", (event) => {
  console.log("Connection established", event);
  socket.send("Hello Server!");
});
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
socket.addEventListener("close", (event) => {
  console.log("Connection closed!", event);
});
socket.addEventListener("error", (event) => {
  console.log("WS Ups!", event);
});

const socketClose = () => socket.close();

export const ChatBox = () => {
  return (
    <aside className={s.chatBox}>
      <ol>
        <li>{"message here"}</li>
      </ol>
      <footer>
        <textarea cols={30} rows={4}></textarea>
        <button onClick={() => socket.send("Client sent a message")}>
          send
        </button>
      </footer>
    </aside>
  );
};
