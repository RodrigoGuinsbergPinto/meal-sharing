import React, { useContext } from "react";
import Meal from "./Meal";
import { MealsContext } from "./MealsContext";

function MealList() {
  const { meals, isLoading } = useContext(MealsContext);

  return (
    <div>
      <div className="header">
        <h1>Our Menu</h1>
        <h3>Choose your favorite from our Italian classics.</h3>
      </div>

      {meals ? (
        <ul>
          {meals.map((meal) => (
            <Meal meal={meal} key={meal.id} />
          ))}
        </ul>
      ) : (
        <div>{isLoading && <p>Loading...</p>} </div>
      )}
    </div>
  );
}

export default MealList;
