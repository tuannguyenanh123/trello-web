import React, { useCallback, useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import Column from "../column/Column";
import "./BoardContent.scss";
import { initData } from "../../Actions/initData";
import { mapOrder } from "./../../utilities/Sort";
import { applyDrag } from "./../../utilities/DragDrop";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isOpenColumnForm, setIsOpenColumnForm] = useState(false);
  const newColumnInputRef = useRef(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const onNewColumnTitleChange = useCallback((e) => {
    setNewColumnTitle(e.target.value);
  }, []);

  useEffect(() => {
    const boardFromDb = initData.boards.find((board) => board.id === "board-1");
    if (boardFromDb) {
      setBoard(boardFromDb);

      // sort columns
      // sort columns follow columnOrder
      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select(); // bôi đen value
    }
  }, [isOpenColumnForm]);
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

  const toggleOpenNewColumnForm = () => {
    setIsOpenColumnForm(!isOpenColumnForm);
  };

  const handleAddNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5), // 5 random characters
      boardId: board.id,
      title: newColumnTitle.trim(), // bỏ những khoảng trống ở đầu cuối
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
    setNewColumnTitle("");
    toggleOpenNewColumnForm();
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    console.log(newColumnToUpdate);
    const columnIdToUpdate = newColumnToUpdate.id;
    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (col) => col.id === columnIdToUpdate
    );
    if (newColumnToUpdate._destroy) {
      //remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }
    // update state for board and columns
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
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
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="trello-container-candyDev">
        {!isOpenColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"></i>
              Add other column
            </Col>
          </Row>
        )}
        {isOpenColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-enter-new-column"
                size="sm"
                type="text"
                placeholder="Enter column title..."
                // required
                // isInvalid
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleAddNewColumn()
                }
              />
              <Button variant="success" size="sm" onClick={handleAddNewColumn}>
                Add Column
              </Button>
              <span
                className="cancel-new-column"
                onClick={toggleOpenNewColumnForm}
              >
                <i className="fa fa-trash icon"></i>
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
};

export default BoardContent;
