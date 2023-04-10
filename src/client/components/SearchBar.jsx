import React from "react";
import { useState, useEffect, useContext } from "react";
import Meal from "./Meal";
import { MealsContext } from "./MealsContext";

function SearchBar() {
  const { isLoading } = useContext(MealsContext);

  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMealByTitle = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/meals?title=${query}`
        );
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMealByTitle();
  }, [query]);
  console.log(meals);

  return (
    <div>
      <div className="search-bar">
        <label>Search meal by name: </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
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
    </div>
  );
}

export default SearchBar;
