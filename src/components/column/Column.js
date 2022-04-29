import React from "react";
import Task from "../Task/Task";
import "./Column.scss";

const Column = () => {
  return (
    <div className="column">
      <header>Brainstorm</header>
      <ul className="task-list">
        <Task />
        {/* <li className="task-item">
          <img
            src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
            alt="anhcandydev-img"
          />
          Title: candydev
        </li>
  */}
        <li className="task-item">Info</li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
        <li className="task-item">Info</li>
        <li className="task-item">
          This is used to determine the number of views to design and how the
          user can navigate through the platform.
        </li>
      </ul>
      <footer>add other card</footer>
    </div>
  );
};

export default Column;
