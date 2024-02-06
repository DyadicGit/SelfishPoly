import React, { FormEventHandler, useRef } from "react";
import s from "./chat.module.scss";

function initializeHandshakeID() {
  if (!document.cookie.includes("clientUID")) {
    const clientUID = window.crypto.randomUUID();
    sessionStorage.setItem("clientUID", clientUID);
    document.cookie = `clientUID=${clientUID}; SameSite=None; Secure`;
  }
}
initializeHandshakeID();

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement && textAreaRef.current) {
      const message = new FormData(event.target).get("message");
      if (typeof message === "string") {
        socket.send(message);
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <aside className={s.chatBox}>
      <ol>
        <li>{"message here"}</li>
      </ol>
      <form onSubmit={sendMessage}>
        <textarea
          name="message"
          cols={30}
          rows={4}
          ref={textAreaRef}
        ></textarea>
        <button>send</button>
      </form>
    </aside>
  );
};
