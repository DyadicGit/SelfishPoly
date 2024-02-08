import { Message } from "@poly/domain";
import { updateStore } from "./store";

export const dispatchPingHandshakeAction = (txt: string) =>
  updateStore({
    type: "GREETINGS",
    payload: { message: txt, time: new Date().toISOString() },
  });

export const dispatchPongHandshakeAction = (message: Message) =>
  updateStore({ type: "GREETINGS", payload: message });

export const dispatchOutgoingAction = (text: string) =>
  updateStore({
    type: "TO_SERVER",
    payload: { message: text, time: new Date().toISOString() },
  });

export const dispatchIncomingAction = (message: Message) =>
  updateStore({ type: "TO_CLIENT", payload: message });

export const dispatchLoadHistoryAction = (messages: Message[]) =>
  updateStore({ type: "LOAD_HISTORY", payload: messages });
