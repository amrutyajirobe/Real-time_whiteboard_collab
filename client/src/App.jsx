import { useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import Whiteboard from "./components/Whiteboard";
import Presence from "./components/Presence";
import socket from "./socket";

function App() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState("pen"); // "pen" | "eraser"
  const [users, setUsers] = useState([]);

  // Listen for presence updates from the server
  useEffect(() => {
    const handleUsers = (userList) => setUsers(userList);
    socket.on("users", handleUsers);
    return () => socket.off("users", handleUsers);
  }, []);

  return (
    <div className="app">
      {/* Presence badges — top-right corner */}
      <Presence users={users} />

      {/* Canvas takes the full viewport */}
      <Whiteboard color={color} brushSize={brushSize} tool={tool} />

      {/* Floating toolbar — bottom center */}
      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        tool={tool}
        setTool={setTool}
      />
    </div>
  );
}

export default App;
