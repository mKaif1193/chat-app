import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is Working!");
});

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
