// ───────────────────────────────────────────────
// socket.js  –  Socket.io client connection
// ───────────────────────────────────────────────
//
// WHY a separate file?
//   We create the socket instance ONCE and export it.
//   Every component that imports this file gets the SAME connection —
//   no accidental duplicate connections.
//
// HOW IT WORKS:
//   io("http://localhost:3001") opens a WebSocket connection to our
//   Express + Socket.io server.  Under the hood Socket.io does:
//     1. HTTP long-polling handshake (for reliability)
//     2. Upgrades to a real WebSocket if the browser supports it
//   After this, messages flow instantly in both directions.

import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

const socket = io(SERVER_URL);

export default socket;

