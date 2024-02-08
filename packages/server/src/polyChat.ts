import WebSocket from "ws";
import { IncomingMessage } from "http";
import { ChatAction } from "@poly/domain";
import { databaseMessages } from "./data";

const extractUserIdFromCookie = (cookieString: string | undefined) => {
  const matchClientUID = /(clientUID=)([\d\w-]+);?/;
  return matchClientUID.exec(cookieString || "")?.[0] || "clientUID=FALLBACK;";
};

const clientsSessionMap = new Map<string, WebSocket>();

export const connectPolyChat = (ws: WebSocket, request: IncomingMessage) => {
  const userId = extractUserIdFromCookie(request.headers.cookie);
  clientsSessionMap.set(userId, ws);

  const sendAction = (action: ChatAction) =>
    clientsSessionMap.get(userId)?.send(JSON.stringify(action), (err) => {
      if (action.type === "TO_CLIENT") {
        if (err) {
          console.error(`failed to send to userId ${userId}`, action, err);
        } else {
          databaseMessages.add(action.payload);
        }
      }
    });

  console.log("Connection Open", userId);
  sendAction({ type: "LOAD_HISTORY", payload: [...databaseMessages] });

  ws.on("error", (err) => console.error("connect client, error: ", err));
  ws.on("close", () => clientsSessionMap.delete(userId));

  ws.on("message", function (rawData) {
    console.log(`Received message "${rawData}" from user ${userId}`);
    const actionFromClient: ChatAction = JSON.parse(`${rawData}`);

    switch (actionFromClient.type) {
      case "GREETINGS":
        sendAction({
          type: "GREETINGS",
          payload: {
            message: `Hello I am Poly !`,
            received: "",
            sent: new Date().toISOString(),
          },
        });
        break;
      case "TO_SERVER":
        databaseMessages.add(actionFromClient.payload);
        // ping-pong back to web-app
        sendAction({
          type: "TO_CLIENT",
          payload: {
            message: `POLY ${actionFromClient.payload.message}`,
            received: "",
            sent: new Date().toISOString(),
          },
        });
        break;
    }
  });
};
