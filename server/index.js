import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./route.js";
import { addUser } from "./users.js";
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
  socket.on("join", ({ username, room }) => {
    socket.join(room);

    const { user } = addUser({ username, room });

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hello ${user.username}` },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: {
        user: { name: "Admin" },
        message: `User ${user.username} has joined `,
      },
    });
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(5555, () => {
  console.log("Server is running");
});
