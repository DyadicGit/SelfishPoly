import { useStore } from "./store";
import { dispatchOutgoingAction } from "./actions";
import { socket } from "./websocket";

export const useChat = () => {
  const messages = useStore();

  return {
    messages,
    sendMessage: (text: string) =>
      socket.send(JSON.stringify(dispatchOutgoingAction(text))),
  };
};
