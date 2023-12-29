require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socket = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("Server is connected");

  socket.on("join-room", ({ roomId, peerId }) => {
    if (rooms[roomId]) {
      console.log(`user joined the room: ${roomId}`);
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }
    socket.on("disconnect", () => {
      console.log("user left room", peerId);
      rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
      socket.to(roomId).emit("user-disconnected", peerId);
    });
  });

  socket.on("create-room", () => {
    const roomId = uuidv4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
    console.log("user created the room");
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(port, () => console.log(`server is running on port ${port}`));

// const users = {};

// const socketToRoom = {};

// io.on("connection", (socket) => {
//   socket.on("join room", (roomID) => {
//     if (users[roomID]) {
//       const length = users[roomID].length;
//       if (length === 4) {
//         socket.emit("room full");
//         return;
//       }
//       users[roomID].push(socket.id);
//     } else {
//       users[roomID] = [socket.id];
//     }
//     socketToRoom[socket.id] = roomID;
//     const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

//     socket.emit("all users", usersInThisRoom);
//   });

//   socket.on("sending signal", (payload) => {
//     io.to(payload.userToSignal).emit("user joined", {
//       signal: payload.signal,
//       callerID: payload.callerID,
//     });
//   });

//   socket.on("returning signal", (payload) => {
//     io.to(payload.callerID).emit("receiving returned signal", {
//       signal: payload.signal,
//       id: socket.id,
//     });
//   });

//   socket.on("disconnect", () => {
//     const roomID = socketToRoom[socket.id];
//     let room = users[roomID];
//     if (room) {
//       room = room.filter((id) => id !== socket.id);
//       users[roomID] = room;
//     }
//   });
// });
