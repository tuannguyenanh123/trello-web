import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";

import Card from "../Card/Card";
import "./Column.scss";
import { mapOrder } from "../../utilities/Sort";
import ConfirmModal from "../Common/ConfirmModal";
import {
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_CLOSE,
} from "./../../utilities/constants";
import {
  saveContentAfterPressEnter,
  handleSelectAllText,
} from "./../../utilities/ContentEditable";

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const toggleShowConfirmModal = () => {
    setIsShowConfirmModal(!isShowConfirmModal);
  };

  const onConfirmModalAction = (type) => {
    console.log(type);
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i>
          Add other card
        </div>
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
