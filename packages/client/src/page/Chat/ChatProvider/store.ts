import { ChatAction, Message } from "@poly/domain";
import { internalStateReducer } from "./reducer";
import { useSyncExternalStore } from "react";

let snapshot: Message[] = [];
type Listener = () => void;
let listeners = new Set<Listener>();

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => snapshot;

export const updateStore = (action: ChatAction) => {
  snapshot = internalStateReducer(snapshot, action);
  listeners.forEach((l) => l());
  return action;
};

export const useStore = () => useSyncExternalStore(subscribe, getSnapshot);
