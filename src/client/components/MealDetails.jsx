import { useParams, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { MealsContext } from "./MealsContext";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";

function MealDetails() {
  const { id } = useParams();
  // console.log(id);
  const { getMeal, isSuccess } = useContext(MealsContext);

  if (!isSuccess()) {
    return <h2>Loading...</h2>;
  }

  const meal = getMeal(id);

  if (!meal) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="header">
        <h1>Meal Details</h1>
        <h3>All you need to know about our delicious {meal.title}!</h3>
      </div>
      <div>
        <div className="mealdetails-content">
          <div className="card">
            <p className="meal-title">{meal.title}</p>
            <p>Description: {meal.description}</p>
            <p>Price: {meal.price}</p>
          </div>
          <ReservationForm mealId={id} />
          <ReviewForm mealId={id} />
        </div>
      </div>
    </div>
  );
}
export default MealDetails;
