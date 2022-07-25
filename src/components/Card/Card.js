import React from "react";
import { useDispatch } from "react-redux";
import { ArrowLeftCircle, ArrowRightCircle, Trash2 } from "react-feather";

import { removeTodo, goForwardTodo, goBackwardTodo } from "../../redux/TodoSlice";
import "./Card.css";

const Card = ({ card, boardId }) => {
  // dispatch is used to dispatch the data to reducer function
  const dispatch = useDispatch();

  // Card id and Card name using destructuring of object "card"
  const { id, name } = card;

  return (
    <div className="card" >
      <div className="card_title">{name}</div>

      {/* Cards button */}
      <div className="card-buttons">
        <ul className="button-list">
          <li className={`first_board${boardId}`} onClick={() => dispatch(goBackwardTodo({ boardId, id }))}>{<ArrowLeftCircle />}</li>
          <li className={`last_board${boardId}`} onClick={() => dispatch(goForwardTodo({ boardId, id }))}>{<ArrowRightCircle />}</li>
          <li onClick={() => dispatch(removeTodo({ boardId, id }))}>{<Trash2 />}</li>
        </ul>
      </div>

    </div>
  );
}

export default Card;