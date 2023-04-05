import React from "react";
import { Link } from "react-router-dom";

function Meal(props) {
  const { meal } = props;

  return (
    <li className="card">
      <p className="meal-title">{meal.title}</p>

      <Link to={`/meals/${meal.id}`}>
        <button className="description-button">Description</button>
      </Link>
    </li>
  );
}

export default Meal;
