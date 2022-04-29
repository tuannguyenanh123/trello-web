import React from "react";
import Column from "../column/Column";
import "./BoardContent.scss";

const BoardContent = () => {
  return (
    <div className="board-content">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default BoardContent;
