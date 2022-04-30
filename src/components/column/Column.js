import React from "react";

import Card from "../Card/Card";
import "./Column.scss";
import { mapOrder } from "../../utilities/Sort";

const Column = ({ column }) => {
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </ul>
      <footer>Add other card</footer>
    </div>
  );
};

export default Column;
