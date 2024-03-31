const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

socket.on("join_room", (data) => {
  socket.join(data);
})

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Testing Server!!!");
  //   console.log(server);
});
