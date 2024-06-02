import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./route.js";
const app = express();

app.use(cors({ origin: "*" }));
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(5555, () => {
  console.log("Server is running");
});
