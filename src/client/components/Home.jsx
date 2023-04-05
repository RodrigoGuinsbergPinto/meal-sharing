import React, { useContext } from "react";
import Meal from "./Meal";
import { MealsContext } from "./MealsContext";
import { Link } from "react-router-dom";

function Home() {
  const { meals, isLoading } = useContext(MealsContext);

  return (
    <div>
      <div className="header">
        <h2>Classic recipes from authentic Italian products.</h2>
        <h3>
          Here is a sample of the traditional Italian dishes you can enjoy at
          our restaurant.
        </h3>
      </div>

      <div>
        {meals ? (
          <ul>
            {meals.slice(0, 3).map((meal) => (
              <Meal meal={meal} key={meal.id} />
            ))}
          </ul>
        ) : (
          <div>{isLoading && <p>Loading...</p>} </div>
        )}
      </div>
      <Link to="/meals">
        <button>See more...</button>
      </Link>
    </div>
  );
}

export default Home;
