import React, { useState, useContext } from "react";
import { MealsContext } from "./MealsContext";

function ReviewForm({ mealId }) {
  const { setIsLoading } = useContext(MealsContext);

  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addStars, setAddStars] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleFormSubmit = () => {
    const data = {
      meal_id: mealId,
      title: addTitle,
      description: addDescription,
      stars: addStars,
      created_date: new Date().toJSON().slice(0, 10),
    };

    setIsLoading(true);

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAddTitle("");
        setAddDescription("");
        setAddStars("");
        alert(`Your review has been sent.`);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
      .finally(setIsLoading(false));
  };

  const displayReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={displayReviewForm}>
            {!showReviewForm ? "Write a review" : "Close review form"}
          </button>
        </div>
        {showReviewForm && (
          <form className="reservation-form-container">
            <h3 className="reservation-title">Write a review on this dish.</h3>

            <div className="reservation-form-input">
              <label htmlFor="title">*Title: </label>
              <input
                type="text"
                value={addTitle}
                onChange={(e) => {
                  setAddTitle(e.target.value);
                }}
                id="title"
                required
              />
            </div>

            <div className="reservation-form-input">
              <label htmlFor="description">*Comments: </label>
              <textarea
                rows="4"
                cols="30"
                value={addDescription}
                onChange={(e) => {
                  setAddDescription(e.target.value);
                }}
                id="description"
                required
              />
            </div>

            <div className="reservation-form-input">
              <label htmlFor="stars">*Stars: </label>
              <input
                type="number"
                min="1"
                max="5"
                value={addStars}
                onChange={(e) => {
                  setAddStars(e.target.value);
                }}
                id="stars"
                required
              />
            </div>

            <button type="button" onClick={handleFormSubmit}>
              Send review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
