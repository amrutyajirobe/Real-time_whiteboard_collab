import { useRef, useEffect } from "react";
import socket from "../socket";

function Whiteboard({ color, brushSize, tool }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // ── Setup: resize, socket listeners, clear listener ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      let imageData = null;
      if (canvas.width > 0 && canvas.height > 0) {
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch {
          // Ignore if canvas isn't ready or readable
        }
      }
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      if (imageData) {
        ctx.putImageData(imageData, 0, 0);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Receive drawing from other users
    const handleRemoteDraw = (data) => {
      drawLine(
        ctx,
        data.x0, data.y0, data.x1, data.y1,
        data.color, data.brushSize, data.tool
      );
    };
    socket.on("draw", handleRemoteDraw);

    // Clear canvas (remote + local)
    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    socket.on("clear", clearCanvas);
    window.addEventListener("whiteboard-clear", clearCanvas);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("whiteboard-clear", clearCanvas);
      socket.off("draw", handleRemoteDraw);
      socket.off("clear", clearCanvas);
    };
  }, []);

  // ── Core drawing function ──
  const drawLine = (ctx, x0, y0, x1, y1, strokeColor, strokeWidth, drawTool = "pen") => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);

    if (drawTool === "eraser") {
      // destination-out removes pixels, revealing the CSS dot-grid behind
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeColor;
    }

    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  // ── Mouse handlers ──
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    lastPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawLine(ctx, lastPos.current.x, lastPos.current.y, x, y, color, brushSize, tool);

    socket.emit("draw", {
      x0: lastPos.current.x,
      y0: lastPos.current.y,
      x1: x,
      y1: y,
      color,
      brushSize,
      tool,
    });

    lastPos.current = { x, y };
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}

export default Whiteboard;
