import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import Navbar from "./navbar";

const Canvas = () => {
  const [lines, setLines] = useState([]);
  const [currentColor, setCurrentColor] = useState("black");
  const [currentTool, setCurrentTool] = useState("pen");
  const stageRef = useRef(null);

  useEffect(() => {
    if (!stageRef.current) {
      stageRef.current = document.createElement("canvas");
    }
  }, []);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const newLine = {
      points: [pos.x, pos.y],
      color: currentTool === "eraser" ? "white" : currentColor,
      tool: currentTool,
    };
    setLines([...lines, newLine]);
  };

  const handleMouseMove = (e) => {
    if (e.evt.buttons !== 1) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLineIndex = lines.length - 1;
    const lastLine = lines[lastLineIndex];

    if (lastLine && lastLine.tool === currentTool) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      const newLines = lines.slice();
      newLines.splice(lastLineIndex, 1, lastLine);
      setLines(newLines);
    }
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleToolChange = (tool) => {
    setCurrentTool(tool);
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleEraseLine = () => {
    const newLines = lines.slice();
    newLines.pop();
    setLines(newLines);
  };

  const handleSave = () => {
    const canvas = stageRef.current;
    const context = canvas.getContext("2d");
    const { width, height } = stageRef.current.getBoundingClientRect();

    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.points[0], line.points[1]);
      for (let i = 2; i < line.points.length; i += 2) {
        context.lineTo(line.points[i], line.points[i + 1]);
      }
      context.strokeStyle = line.color;
      context.lineWidth = 5;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.stroke();
    });

    const dataURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "canvas-image.png";
    a.click();
  };

  return (
    <div>
      <Navbar
        onColorChange={handleColorChange}
        onToolChange={handleToolChange}
        onClear={handleClear}
        onEraseLine={handleEraseLine}
        onSave={handleSave}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
