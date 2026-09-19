import { io } from "socket.io-client";

// Read server URL from environment variable, fallback to localhost for local dev
const RAW_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

// Remove any trailing slashes to prevent connection path issues
const SERVER_URL = RAW_URL.replace(/\/+$/, "");

const socket = io(SERVER_URL, {
    autoConnect: true,
    reconnection: true,
    transports: ["websocket", "polling"],
});

export default socket;
