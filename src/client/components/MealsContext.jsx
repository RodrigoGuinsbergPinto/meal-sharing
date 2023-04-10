import React, { createContext, useState, useEffect } from "react";

const MealsContext = createContext({});

function MealsProvider({ children }) {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const resp = await fetch("/api/meals");
      const result = await resp.json();
      // console.log(result);
      setMeals(result);
      setRequestState("success");

      setIsLoading(false);
    })();
  }, []);

  const getMeal = (mealId) => {
    if (!meals) return undefined;
    return meals.find((meal) => meal.id === parseInt(mealId));
  };

  const isSuccess = () => {
    return requestState === "success";
  };

  const contextValue = { meals, isLoading, setIsLoading, isSuccess, getMeal };

  return (
    <MealsContext.Provider value={contextValue}>
      {children}
    </MealsContext.Provider>
  );
}

export { MealsContext, MealsProvider };
