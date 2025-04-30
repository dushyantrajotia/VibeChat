const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://vibechat-ten.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://vibechat-ten.vercel.app",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
  },
});

let currentSong = { id: "", title: "" };
let isPlaying = false;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("playSong", currentSong);
  socket.emit("togglePlayPause", isPlaying);

  socket.on("requestCurrentState", () => {
    socket.emit("playSong", currentSong);
    socket.emit("togglePlayPause", isPlaying);
  });

  socket.on("playSong", ({ id, title }) => {
    currentSong = { id, title };
    isPlaying = true;
    io.emit("playSong", currentSong);
  });

  socket.on("togglePlayPause", (status) => {
    isPlaying = status;
    io.emit("togglePlayPause", isPlaying);
  });

  socket.on("sendMessage", ({ username, text }) => {
    io.emit("receiveMessage", { username, text });
  });

  socket.on("userTyping", (isTyping) => {
    socket.broadcast.emit("userTyping", isTyping);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
