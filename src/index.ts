import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from "express";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes";
import commentRouter from "./routes/comment.routes";

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use('/api/v1/', userRouter, commentRouter);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_comment", (data) => {
    io.emit("receive_comment", data);
  });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
