import React from "react";
import "./Card.scss";

const Card = ({ card }) => {
  return (
    <div className="card-item">
      {card.img && (
        <img
          src={card.img}
          alt="anhcandydev-img"
          className="card-img"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  );
};

export default Card;
