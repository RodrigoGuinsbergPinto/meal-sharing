import React, { useState, useEffect, useContext } from "react";
import { MealsContext } from "./MealsContext";

function Reviews() {
  const { isLoading } = useContext(MealsContext);
  const [reviews, setReviews] = useState();
  // const [requestState, setRequestState] = useState("loading");
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    fetch("api/reviews")
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <div>
      {notFound ? <p>The page you are looking for was not found.</p> : null}
      <div className="header">
        <h2>Read here what customers are saying about our restaurant.</h2>
      </div>
      {reviews ? (
        <ul>
          {reviews.map((review) => (
            <li className="card" key={review.id}>
              <p className="meal-title">{review.title}</p>
              <p>Description: {review.description}</p>
              <p>Stars: {review.stars}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>{isLoading && <p>Loading...</p>} </div>
      )}
    </div>
  );
}

export default Reviews;
