import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import router from "./route.js";
import { addUser, findUser, getRoomUsers, removeUser } from "./users.js";

const app = express();
const ADMIN = "Admin";

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

    const { user, isExist } = addUser({ username, room });

    const userMessage = isExist
      ? `${user.username} here you go again`
      : `Hello ${user.username}`;

    socket.emit("message", {
      data: { user: { name: ADMIN }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: {
        user: { name: ADMIN },
        message: `User ${user.username} has joined `,
      },
    });

    io.to(user.room).emit("joinRoom", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", {
        data: { user: { name: user.username }, message },
      });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      io.to(user.room).emit("message", {
        data: { user: { name: ADMIN }, message: `${user.username} has left` },
      });
    }

    io.to(user.room).emit("joinRoom", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(5555, () => {
  console.log("Server is running");
});
