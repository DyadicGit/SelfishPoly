import express from "express";
import { apiNotes } from "./src/apiNotes";

import WebSocket from "ws";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  const ALLOWED_CORS_ORIGIN = "http://localhost:3000";
  const cacheHours = 60; // 1 minute

  res.header("Access-Control-Allow-Origin", ALLOWED_CORS_ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "false");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Max-Age", `${cacheHours}`);
  next();
});

// For Handling unhandled promise rejection
process.on("unhandledRejection", (reason: any) => {
  console.log("[Unhandled Rejection]::", reason.message);
  throw reason;
});
process.on("uncaughtException", (error) => {
  console.log("[Uncaught Exception]::", error.message);
  throw error;
});

app.get("/", (req, res) => {
  res.send(`<h1>SelfishPoly server is running</h1>`);
});
app.use(apiNotes);

const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

const wsServer = new WebSocket.WebSocketServer({
  noServer: true,
});

/** # Multiple servers sharing a single HTTP/S server
 * @source https://www.npmjs.com/package/ws#simple-server*/
server.on("upgrade", function upgrade(request, socket, head) {
  wsServer.handleUpgrade(request, socket, head, function done(ws) {
    wsServer.emit("connection", ws, request);

    ws.on("error", (err) =>
      console.error("express server upgrade, error: ", err)
    );

    ws.on("close", function () {
      console.log("express server upgrade, close: ");
    });
  });
});

const extractUserId = (cookieString: string | undefined) => {
  const matchClientUID = /(clientUID=)([\d\w-]+);?/;
  return matchClientUID.exec(cookieString || "")?.[0] || "clientUID=FALLBACK;";
};

const clientsSessionMap = new Map();

wsServer.on("connection", function (ws, request) {
  const userId = extractUserId(request.headers.cookie);
  clientsSessionMap.set(userId, ws);

  ws.on("error", (err) => console.error("connect client, error: ", err));

  ws.on("message", function (message) {
    console.log(`Received message "${message}" from user ${userId}`);
    // ping-pong back to web-app
    clientsSessionMap.get(userId).send(`POLY ${message}`);
  });

  ws.on("close", function () {
    clientsSessionMap.delete(userId);
  });
});
