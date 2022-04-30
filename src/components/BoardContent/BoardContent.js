import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";

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
  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle" // đặt css này vào element nào bạn muốn kéo, không đặt thì mặc định sẽ kéo ở bất kì chỗ nào đc bọc
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
        getChildPayload={(index) => columns[index]}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
};

export default BoardContent;
