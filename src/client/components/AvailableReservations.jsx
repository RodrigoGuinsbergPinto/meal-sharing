import React, { useState, useEffect } from "react";

function AvailableReservations({ mealId }) {
  const [availableReservations, setAvailableResevations] = useState(0);

  const updateAvailableReservations = async () => {
    const reservations = await fetch(`/api/reservations/${mealId}`).then(
      (response) => response.json()
    );
    const totalReservations = reservations.expectedreservation.reduce(
      (n, reservation) => {
        return n + reservation.number_of_guests;
      },
      0
    );
    const [{ max_reservations: maxReservations }] = (
      await fetch(`/api/meals/${mealId}`).then((response) => response.json())
    ).expectedmeal;
    setAvailableResevations(maxReservations - totalReservations);
  };
  useEffect(() => {
    updateAvailableReservations();
  }, []);

  return (
    <div>
      <p>
        There are {availableReservations} available reservations for this meal.
      </p>
    </div>
  );
}

export default AvailableReservations;
