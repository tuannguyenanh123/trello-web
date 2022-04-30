import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import Column from "../column/Column";
import "./BoardContent.scss";
import { initData } from "../../Actions/initData";
import { mapOrder } from "./../../utilities/Sort";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDb = initData.boards.find((board) => board.id === "board-1");
    if (boardFromDb) {
      setBoard(boardFromDb);

      // sort columns
      // sort columns follow columnOrder
      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, "id"));
    }
  }, []);
  if (isEmpty(board)) {
    return (
      <div
        className="not-found"
        style={{
          padding: "10px",
          color: "white",
          fontSize: "20px",
        }}
      >
        No board found.
      </div>
    );
  }

  return (
    <div className="board-content">
      {columns.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
};

export default BoardContent;
