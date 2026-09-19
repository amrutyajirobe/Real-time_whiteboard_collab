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
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => {
      setIsConnected(false);
      setUsers([]);
    };
    const handleUsers = (userList) => setUsers(userList);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("users", handleUsers);

    // Initial check
    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("users", handleUsers);
    };
  }, []);

  return (
    <div className="app">
      {/* Presence badge / connection indicator — top-right corner */}
      <Presence users={users} isConnected={isConnected} />

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
