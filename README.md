# 🎨 Real-Time Collaborative Whiteboard

A lightweight, modern real-time collaborative whiteboard web application built with **React**, **HTML5 Canvas**, **Node.js/Express**, and **Socket.io**. Multiple users can sketch, erase, customize pen colors and sizes, and see each other's live changes and collaborator presence in real-time.

---

## ✨ Features

- **⚡ Real-Time Collaboration**: Instant bidirectional synchronization using WebSockets via Socket.io.
- **🖌️ Drawing Tools**:
  - **Pen & Eraser**: Seamless toggle between drawing strokes and erasing paths (`destination-out` blending).
  - **Preset Color Swatches**: Quick-select palettes (Black, Blue, Red, Green, Purple, Orange) plus a native custom color wheel.
  - **Adjustable Stroke Thickness**: Custom-styled slider for dynamic brush/eraser sizing (1px – 20px).
- **👥 Live Collaborator Presence**:
  - Live user counter and distinct colored avatar pills showing active participants.
  - Automatic avatar assignment and presence updates on connection / disconnection.
- **✨ Modern Glassmorphic UI**:
  - Floating, rounded toolbar centered at the bottom with backdrop blur (`backdrop-filter`).
  - Subtle drop shadows, clean borders, and Lucide icon buttons.
  - Subtle interactive "ghost" clear button that signals danger only on hover.
- **📐 Canvas Depth**: Dot-grid pattern background that provides workspace depth without interfering with drawing exports.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
- **React 18** (Vite-powered SPA)
- **HTML5 Canvas 2D API** (High-performance stroke rendering)
- **Socket.io Client** (Real-time event streaming)
- **Lucide React** (Clean, minimalist iconography)
- **Vanilla CSS** (Custom glassmorphism & responsive layout)

### Backend (`server/`)
- **Node.js**
- **Express** (HTTP server & health checks)
- **Socket.io** (WebSocket connection handling & broadcast relay)
- **CORS** (Cross-origin resource sharing configuration)

---

## 📁 Project Structure

```text
real-time_whiteboard_collab/
├── README.md
├── server/
│   ├── index.js          # Express server & Socket.io presence / broadcast handlers
│   ├── package.json      # Server dependencies & scripts
│   └── package-lock.json
│
└── client/
    ├── index.html        # HTML shell
    ├── vite.config.js    # Vite configuration (port 3000)
    ├── package.json      # Client dependencies & scripts
    └── src/
        ├── main.jsx      # React DOM entry point
        ├── App.jsx       # Root layout & presence state
        ├── App.css       # Complete UI & glassmorphic styling
        ├── socket.js     # Shared Socket.io client instance
        └── components/
            ├── Presence.jsx    # Active collaborators pill (top right)
            ├── Toolbar.jsx     # Floating bottom control bar
            └── Whiteboard.jsx  # HTML5 Canvas logic & mouse tracking
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd real-time_whiteboard_collab
```

### 2. Start the Backend Server
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
npm start
```
> The server will start on **`http://localhost:3001`**. You can verify it by opening that URL in your browser to see `{ "status": "ok" }`.

### 3. Start the Frontend Client
Open a **separate** terminal and navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```
> The frontend application will start on **`http://localhost:3000`**.

---

## 🧪 Testing Real-Time Collaboration

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Open a **second tab** or an **incognito window** to the same address ([http://localhost:3000](http://localhost:3000)).
3. Notice the **collaborator presence indicator** in the top right corner increase to `2 online`.
4. Draw or erase in one window and watch the strokes immediately appear on the other!
5. Click the trash icon to clear the canvas across all connected screens.

---

## 📡 Socket Events Architecture

| Event | Direction | Payload | Description |
|---|---|---|---|
| `connection` | Client ➔ Server | — | Triggers user registration and assigns random avatar color |
| `users` | Server ➔ Clients | `User[]` | Emitted to all clients whenever someone joins or disconnects |
| `draw` | Client ➔ Server | `{ x0, y0, x1, y1, color, brushSize, tool }` | Sends continuous line segment data |
| `draw` | Server ➔ Other Clients | `{ x0, y0, x1, y1, color, brushSize, tool }` | Broadcasted to all peers (`broadcast.emit`) |
| `clear` | Client ➔ Server | — | Requests to clear all canvases |
| `clear` | Server ➔ Other Clients | — | Broadcasted to wipe the canvas for all collaborators |
| `disconnect` | Client ➔ Server | — | Triggered automatically when a browser tab closes |

---

## 📜 Available Scripts

### `server/`
- `npm start`: Runs the production server (`node index.js`).
- `npm run dev`: Runs the server with Node file watcher (`node --watch index.js`).

### `client/`
- `npm run dev`: Launches the local Vite development server.
- `npm run build`: Bundles production assets into `client/dist`.
- `npm run preview`: Previews the local production build.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

