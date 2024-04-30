import React, { useState } from "react";
import "./navbar.css";

const Navbar = ({
  onColorChange,
  onToolChange,
  onClear,
  onEraseLine,
  onSave,
}) => {
  const [selectedTool, setSelectedTool] = useState("pen");

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    onToolChange(tool);
  };

  const handleColorPickerClick = () => {
    document.getElementById("colorPicker").click();
  };

  const handleColorChange = (e) => {
    onColorChange(e.target.value);
  };

  return (
    <nav>
      <input
        type="color"
        id="colorPicker"
        onChange={handleColorChange}
        style={{ display: "none" }}
      />
      <button onClick={handleColorPickerClick}>Color Pen Chooser</button>
      <button
        onClick={() => handleToolChange("pen")}
        className={selectedTool === "pen" ? "selected" : ""}
      >
        Pen
      </button>
      <button
        onClick={() => handleToolChange("eraser")}
        className={selectedTool === "eraser" ? "selected" : ""}
      >
        Eraser
      </button>
      <button onClick={onEraseLine}>Erase Line</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onClear}>Clear</button>
    </nav>
  );
};

export default Navbar;
