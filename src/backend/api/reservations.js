const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - return all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation").select("*");
    res.json(reservations);
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// POST - adds a new reservation to the database
router.post("/", async (req, res) => {
  try {
    const newReservation = req.body;
    const insertReservation = await knex("reservation").insert(newReservation);
    res.status(201).json(insertReservation);
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// GET - returns the reservation by id
router.get("/:id", async (req, res) => {
  try {
    const reservationId = parseInt(req.params.id);
    const reservation = await knex("reservation")
      .select("*")
      .where({ id: reservationId });
    if (reservation.length === 0) {
      res.status(404).send(`Id ${reservationId} not found.`);
    } else res.status(200).json({ expectedreservation: reservation });
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// PUT - updates the reservation by id
router.put("/:id", async (req, res) => {
  try {
    const reservationId = parseInt(req.params.id);
    const updatedReservation = await knex("reservation")
      .where({ id: reservationId })
      .update(req.body);
    if (updatedReservation) {
      res.status(200).json({ ReservationUpdated: reservationId });
    } else res.status(404).send("Id not found.");
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// DELETE - deletes the reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const reservationId = parseInt(req.params.id);
    const deletedReservation = await knex("reservation")
      .where({ id: reservationId })
      .del();
    if (deletedReservation) {
      res
        .status(200)
        ._construct.json({ DeletedReservation: deletedReservation });
    } else {
      res.status(404).json({ message: "Reservation id not valid." });
    }
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

module.exports = router;
