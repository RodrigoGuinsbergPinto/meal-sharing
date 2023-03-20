import React, { useEffect, useState } from "react";

const MealList = () => {
  const [meal, setMeal] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const resp = await fetch("/api/meals");
      const result = await resp.json();
      console.log(result);
      setMeal(result);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {meal ? (
        <ul>
          {meal.map((aMeal) => {
            return (
              <li key={aMeal.id}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {aMeal.title}
                </p>
                <p>Description: {aMeal.description}</p>
                <p>Price: {aMeal.price}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading... </p>
      )}
    </div>
  );
};

export default MealList;
