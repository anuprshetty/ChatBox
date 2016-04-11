import dotenv from "dotenv";
dotenv.config();
import express from "express";
import socket from "socket.io";

const app = express();

app.use(express.static("public"));

const server = app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log(`established socket connection: ${socket.id}`);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
