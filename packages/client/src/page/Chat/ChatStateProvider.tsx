import { Reducer, useSyncExternalStore } from "react";
import { A } from "@poly/domain";
import type { Message } from "@poly/domain";
import { toMessage } from "./utils";

function initializeHandshakeID() {
  if (!document.cookie.includes("clientUID")) {
    const clientUID = window.crypto.randomUUID();
    sessionStorage.setItem("clientUID", clientUID);
    document.cookie = `clientUID=${clientUID}; SameSite=None; Secure`;
  }
}

initializeHandshakeID();

type ChatAction =
  | A<"INCOMING_MESSAGE", Message>
  | A<"OUTGOING_MESSAGE", Message>;

export const chatReducer: Reducer<Message[], ChatAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case "INCOMING_MESSAGE":
    case "OUTGOING_MESSAGE":
      return state.concat(action.payload);
  }
};

let snapshot: Message[] = [];
type Listener = () => void;
let listeners = new Set<Listener>();

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => snapshot;
const update = (action: ChatAction) => {
  snapshot = chatReducer(snapshot, action);
  listeners.forEach((l) => l());
};

const dispatchOutgoingAction = (text: string) => {
  const message = toMessage(text);
  update({ type: "OUTGOING_MESSAGE", payload: message });
  socket.send(message.toString());
};

const dispatchIncomingAction = (message: Message) =>
  update({
    type: "INCOMING_MESSAGE",
    payload: { ...message, received: new Date().toISOString() },
  });

export const useChat = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);

  return { messages, sendMessage: dispatchOutgoingAction };
};

export const socket = new WebSocket("ws://localhost:5000");

socket.addEventListener("open", (event) => {
  console.log("Connection established", event);
  const hello = toMessage("Hello Server!");
  socket.send(hello.toString());
});
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
  dispatchIncomingAction(JSON.parse(event.data));
});
socket.addEventListener("close", (event) => {
  console.log("Connection closed!", event);
});
socket.addEventListener("error", (event) => {
  console.log("WS Ups!", event);
});

export const socketClose = () => socket.close();
