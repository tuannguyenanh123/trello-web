import React, { useEffect, useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { cloneDeep } from "lodash";

import Card from "../Card/Card";
import "./Column.scss";
import { mapOrder } from "../../utilities/Sort";
import ConfirmModal from "../Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "./../../utilities/constants";
import {
  saveContentAfterPressEnter,
  handleSelectAllText,
} from "./../../utilities/ContentEditable";

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [isOpenCardForm, setIsOpenCardForm] = useState(false);
  const toggleOpenNewCardForm = () => {
    setIsOpenCardForm(!isOpenCardForm);
  };

  // mounting and updating component
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const newCardTextAreaRef = useRef(null);
  useEffect(() => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus();
      newCardTextAreaRef.current.select(); // bôi đen value
    }
  }, [isOpenCardForm]);

  const [newCardTitle, setNewCardTitle] = useState("");

  const onNewCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };
  // change value in textarea done before add new card (update state)
  const handleAddNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus();
      console.log(newCardTitle);
      return;
    }
    console.log(">>>>>>>>>>>>>");
    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(), // bỏ những khoảng trống ở đầu cuối
      img: null,
    };
    console.log(column);
    let newColumn = cloneDeep(column); // func cloneDeep create 1 arr not effect to arr origin thay vì dùng destructuring
    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd.id);

    onUpdateColumn(newColumn);
    setNewCardTitle("");
    toggleOpenNewCardForm();
  };

  // hide show modal
  const toggleShowConfirmModal = () => {
    setIsShowConfirmModal(!isShowConfirmModal);
  };

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = { ...column, _destroy: true };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const handleColumnTitleBlur = () => {
    console.log(columnTitle);
    const newColumn = { ...column, title: columnTitle };
    onUpdateColumn(newColumn);
  };
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            className="candydev-content-editable"
            size="sm"
            type="text"
            // required
            // isInvalid
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
            onClick={handleSelectAllText}
          />
        </div>
        <div className="column-dropDown-actions">
          <Dropdown>
            <Dropdown.Toggle
              variant="Secondary"
              id="dropdown-basic"
              size="sm"
              className="dropDown-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item>Move on cards in this column...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => {
            onCardDrop(column.id, dropResult);
          }}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {isOpenCardForm && (
          <div className="add-new-card">
            <Form.Control
              className="textarea-enter-new-card"
              size="sm"
              as="textarea"
              placeholder="Enter a title for this card..."
              spellCheck="false"
              // required
              // isInvalid
              ref={newCardTextAreaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(event) => event.key === "Enter" && handleAddNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {isOpenCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={handleAddNewCard}>
              Add Card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        )}
        {!isOpenCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon"></i>
            Add other card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={isShowConfirmModal}
        title="Remove column"
        onAction={onConfirmModalAction}
        content={`Are you sure you want to remove <strong>${column.title}</strong>`}
      />
    </div>
  );
};

export default Column;
