import { Message } from "@poly/domain";
import { updateStore } from "./store";

export const dispatchHandshakeAction = (txt: string) =>
  updateStore({
    type: "GREETINGS",
    payload: {
      message: txt,
      received: "",
      sent: new Date().toISOString(),
    },
  });

export const dispatchOutgoingAction = (text: string) =>
  updateStore({
    type: "TO_SERVER",
    payload: {
      message: text,
      received: "",
      sent: new Date().toISOString(),
    },
  });

export const dispatchIncomingAction = (message: Message) =>
  updateStore({
    type: "TO_CLIENT",
    payload: { ...message, received: new Date().toISOString() },
  });

export const dispatchLoadHistoryAction = (messages: Message[]) =>
  updateStore({
    type: "LOAD_HISTORY",
    payload: messages,
  });
