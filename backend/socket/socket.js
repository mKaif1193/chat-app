import { Server } from "socket.io";
import http from "http";
import express from "express";
// import cors from "cors";

const app = express();

// app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-mkaif.vercel.app"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
