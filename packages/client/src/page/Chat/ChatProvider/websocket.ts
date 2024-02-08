import { dispatchHandshakeAction, dispatchIncomingAction, dispatchLoadHistoryAction } from "./actions";
import { ChatAction } from "@poly/domain";

function initializeClientID() {
  if (!document.cookie.includes("clientUID")) {
    const clientUID = window.crypto.randomUUID();
    sessionStorage.setItem("clientUID", clientUID);
    document.cookie = `clientUID=${clientUID}; SameSite=None; Secure`;
  }
}

initializeClientID();

export const socket = new WebSocket("ws://localhost:5000");

function incomingActionsOrchestrator(actionFromServer: ChatAction) {
  switch (actionFromServer.type) {
    case "GREETINGS":
      return dispatchHandshakeAction(actionFromServer.payload.message);
    case "LOAD_HISTORY":
      return dispatchLoadHistoryAction(actionFromServer.payload);
    case "TO_CLIENT":
      return dispatchIncomingAction(actionFromServer.payload);
    case "TO_SERVER":
      return /*not possible*/;
  }
}

socket.addEventListener("open", (event) => {
  console.log("Connection established", event);
  socket.send(JSON.stringify(dispatchHandshakeAction("Hello Poly, I'm client.")));
});
socket.addEventListener("message", (event) => {
  const actionFromServer: ChatAction = JSON.parse(event.data);
  console.log("Message from server ", actionFromServer);
  incomingActionsOrchestrator(actionFromServer);
});
socket.addEventListener("close", (event) => {
  console.log("Connection closed!", event);
});
socket.addEventListener("error", (event) => {
  console.log("WS Ups!", event);
});
