const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Health-check route
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// ---------- Socket.io ----------

io.on("connection", (socket) => {
  console.log(`✏️  User connected: ${socket.id}`);

  // Relay drawing data to every other client
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  // Relay canvas-clear to every other client
  socket.on("clear", () => {
    socket.broadcast.emit("clear");
  });

  socket.on("disconnect", () => {
    console.log(`👋 User disconnected: ${socket.id}`);
  });
});

// ---------- Start ----------

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Whiteboard server listening on http://localhost:${PORT}`);
});
