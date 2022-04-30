import React from "react";
import "./Card.scss";

const Card = ({ card }) => {
  return (
    <li className="card-item">
      {card.img && (
        <img src={card.img} alt="anhcandydev-img" className="card-img" />
      )}
      {card.title}
    </li>
  );
};

export default Card;
