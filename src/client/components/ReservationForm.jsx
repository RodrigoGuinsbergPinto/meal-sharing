import React, { useState, useContext, useEffect } from "react";
import { MealsContext } from "./MealsContext";

function ReservationForm({ mealId }) {
  const { setIsLoading, meals } = useContext(MealsContext);

  const [availableReservations, setAvailableResevations] = useState(0);
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addNumberOfGuests, setAddNumberOfGuests] = useState("");

  const handleFormSubmit = () => {
    const bookSeatData = {
      meal_id: mealId,
      contact_name: addName,
      contact_email: addEmail,
      contact_phonenumber: addPhone,
      number_of_guests: Number(addNumberOfGuests),
      created_date: new Date().toJSON().slice(0, 10),
    };

    setIsLoading(true);

    fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookSeatData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAddName("");
        setAddEmail("");
        setAddPhone("");
        setAddNumberOfGuests("");
        alert(`Your reservation has been booked.`);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        updateAvailableRes();
        setIsLoading(false);
      });
  };

  const updateAvailableRes = async () => {
    const reservations = await fetch(`/api/reservations/${mealId}`).then((r) =>
      r.json()
    );
    const totalReservations = reservations.expectedreservation.reduce(
      (n, reservation) => {
        return n + reservation.number_of_guests;
      },
      0
    );
    const [{ max_reservations: maxReservations }] = (
      await fetch(`/api/meals/${mealId}`).then((r) => r.json())
    ).expectedmeal;
    setAvailableResevations(maxReservations - totalReservations);
  };
  useEffect(() => {
    updateAvailableRes();
  }, []);

  return (
    <div>
      <div>
        <p>
          `There are {availableReservations} available reservations for this
          meal.`
        </p>

        {availableReservations > 0 ? (
          <form className="reservation-form-container">
            <h3 className="reservation-title">Make your reservation.</h3>
            <div className="reservation-form-input">
              <label htmlFor="name">*Name: </label>
              <input
                type="text"
                value={addName}
                onChange={(e) => {
                  setAddName(e.target.value);
                }}
                id="name"
                required
              />
            </div>
            <div className="reservation-form-input">
              <label htmlFor="email">*Email: </label>
              <input
                type="email"
                value={addEmail}
                onChange={(e) => {
                  setAddEmail(e.target.value);
                }}
                id="email"
                required
              />
            </div>
            <div className="reservation-form-input">
              <label htmlFor="cellPhone">*Cell phone: </label>
              <input
                type="tel"
                pattern="[0-9]{8}"
                value={addPhone}
                onChange={(e) => {
                  setAddPhone(e.target.value);
                }}
                id="cellPhone"
                required
              />
            </div>
            <div className="reservation-form-input">
              <label htmlFor="numOfGests">*Number of guests: </label>
              <input
                type="number"
                min="1"
                value={addNumberOfGuests}
                onChange={(e) => {
                  setAddNumberOfGuests(e.target.value);
                }}
                id="numOfGests"
                required
              />
            </div>
            <button type="button" onClick={handleFormSubmit}>
              Book seat
            </button>
          </form>
        ) : (
          <p>No reservation available for this meal.</p>
        )}
      </div>
    </div>
  );
}

export default ReservationForm;
