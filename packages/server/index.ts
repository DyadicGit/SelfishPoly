import express from "express";
import { apiNotes } from "./src/apiNotes";

import WebSocket from "ws";
import { connectPolyChat } from "./src/polyChat";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  const ALLOWED_CORS_ORIGIN = "*";
  const cacheHours = 60; // 1 minute

  res.header("Access-Control-Allow-Origin", ALLOWED_CORS_ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("./build"));
  app.get("/health", (req, res) => {
    res.sendStatus(200);
  })
}
if (process.env.NODE_ENV !== 'production') {
  app.get("/", (req, res) => {
    res.send(`<h1>SelfishPoly server is running</h1>`);
  });
}

app.use(apiNotes);

const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

const wsServer = new WebSocket.WebSocketServer({ noServer: true });

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

wsServer.on("connection", connectPolyChat);
