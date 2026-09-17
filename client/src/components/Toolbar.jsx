import { Pencil, Eraser, Trash2 } from "lucide-react";
import socket from "../socket";

const PRESET_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Orange", value: "#f97316" },
];

function Toolbar({ color, setColor, brushSize, setBrushSize, tool, setTool }) {
  const handleClear = () => {
    socket.emit("clear");
    window.dispatchEvent(new Event("whiteboard-clear"));
  };

  return (
    <div className="toolbar">
      {/* ── Tool buttons ── */}
      <div className="toolbar-group">
        <button
          className={`tool-btn ${tool === "pen" ? "active" : ""}`}
          onClick={() => setTool("pen")}
          title="Pen"
        >
          <Pencil size={18} />
        </button>
        <button
          className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
          onClick={() => setTool("eraser")}
          title="Eraser"
        >
          <Eraser size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* ── Preset colour swatches + custom picker ── */}
      <div className="toolbar-group color-swatches">
        {PRESET_COLORS.map((c) => (
          <button
            key={c.value}
            className={`color-swatch ${color === c.value && tool === "pen" ? "active" : ""}`}
            style={{ background: c.value }}
            onClick={() => {
              setColor(c.value);
              setTool("pen");
            }}
            title={c.name}
          />
        ))}

        {/* Custom colour wheel */}
        <label className="custom-color" title="Custom color">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setTool("pen");
            }}
          />
          <span className="custom-color-ring" />
        </label>
      </div>

      <div className="toolbar-divider" />

      {/* ── Brush size slider ── */}
      <div className="toolbar-group size-control">
        <span className="size-label">{brushSize}px</span>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="size-slider"
        />
      </div>

      <div className="toolbar-divider" />

      {/* ── Clear (ghost button) ── */}
      <button className="clear-btn" onClick={handleClear} title="Clear canvas">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default Toolbar;
