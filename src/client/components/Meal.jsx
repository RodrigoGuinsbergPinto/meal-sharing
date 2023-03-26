import React from "react";

function Meal(props) {
  const { meal } = props;

  return (
    <li className="card">
      {/* <p style={{ fontWeight: "bold", fontSize: "20px" }}>{meal.title}</p> */}
      <p className="meal-title">{meal.title}</p>

      <p>Description: {meal.description}</p>
      <p>Price: {meal.price}</p>
    </li>
  );
}

export default Meal;
