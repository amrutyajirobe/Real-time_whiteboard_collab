const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_URL || "*";

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Health-check route
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// ---------- Presence tracking ----------

const users = new Map(); // socketId → { id, name, color }
let userCounter = 0;

const AVATAR_COLORS = [
  "#3b82f6", "#ef4444", "#22c55e", "#8b5cf6",
  "#f97316", "#ec4899", "#14b8a6", "#f59e0b",
];

function broadcastUsers() {
  const userList = Array.from(users.values());
  io.emit("users", userList);
}

// ---------- Socket.io ----------

io.on("connection", (socket) => {
  // Assign each new user a name and avatar colour
  userCounter++;
  const color = AVATAR_COLORS[(userCounter - 1) % AVATAR_COLORS.length];
  const user = { id: socket.id, name: `User ${userCounter}`, color };
  users.set(socket.id, user);

  console.log(`✏️  ${user.name} connected (${socket.id})`);
  broadcastUsers();

  // Relay drawing data to every other client
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  // Relay canvas-clear to every other client
  socket.on("clear", () => {
    socket.broadcast.emit("clear");
  });

  socket.on("disconnect", () => {
    const u = users.get(socket.id);
    console.log(`👋 ${u?.name || "User"} disconnected (${socket.id})`);
    users.delete(socket.id);
    broadcastUsers();
  });
});

// ---------- Start ----------

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Whiteboard server listening on http://localhost:${PORT}`);
});

