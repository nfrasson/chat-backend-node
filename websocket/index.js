const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require("socket.io")
const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socket(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const roomId = socket.handshake.query.roomId;
  console.log("teste", roomId);
  console.log("a user connected", socket.id);

  socket.on("chat message", (msg, payload) => {
    console.log("payload", payload);
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on 3001");
});
