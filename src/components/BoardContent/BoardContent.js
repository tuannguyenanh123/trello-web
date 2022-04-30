import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";

import Column from "../column/Column";
import "./BoardContent.scss";
import { initData } from "../../Actions/initData";
import { mapOrder } from "./../../utilities/Sort";
import { applyDrag } from "./../../utilities/DragDrop";

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
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    // vì column nằm trong board nên khi cập nhật state cho column thì board cũng phải đc cập nhật
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      setColumns(newColumns);
    }
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
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon"></i>
        Add other column
      </div>
    </div>
  );
};

export default BoardContent;
