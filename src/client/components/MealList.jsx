import React, { useEffect, useState } from "react";

const MealList = () => {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const resp = await fetch("/api/meals");
      const result = await resp.json();
      console.log(result);
      setMeals(result);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {meals ? (
        <ul>
          {meals.map((meal) => {
            return (
              <li key={meal.id}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {meal.title}
                </p>
                <p>Description: {meal.description}</p>
                <p>Price: {meal.price}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>{isLoading && <p>Loading...</p>} </div>
      )}
    </div>
  );
};

export default MealList;
