const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - return all reviews
router.get("/", async (req, res) => {
  try {
    const titles = await knex("review").select("*");
    res.status(200).json(titles);
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// POST - adds a new review to the database
router.post("/", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send(`Provide request body to insert.`);
    const meal = await knex("meal")
      .select("id")
      .where({ id: parseInt(req.body.meal_id) });

    if (meal.length === 0) {
      return res.status(404).send(`Meal id not valid.`);
    }
    const new_review = await knex("review").insert({
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: req.body.stars,
    });
    res.status(201).json({ NewReview: req.body });
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// GET - returns the review by id
router.get("/:id", async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const review = await knex("review")
      .select("title", "description", "meal_id", "stars", "created_date")
      .where({ id: reviewId });
    console.log(review.length);
    review.length
      ? res.status(200).json({ expectedReview: review })
      : res.status(200).send(`Review id ${reviewId} not found.`);
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// PUT - updates the review by id
router.put("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  try {
    const meal = await knex("meal")
      .select("id")
      .where({ id: parseInt(req.body.meal_id) });
    if (meal.length === 0) {
      return res.status(404).send(`Meal id doesn't exist.`);
    }
    const updatedReview = await knex("review").where({ id: reviewId }).update({
      description: req.body.description,
      title: req.body.title,
      meal_id: req.body.meal_id,
      stars: req.body.stars,
      created_date: req.body.created_date,
    });
    updatedReview
      ? res.status(200).json({ Updatedrecord: req.body })
      : res.status(404).send(`Id not found.`);
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// DELETE - deletes the review by id
router.delete("/:id", async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const deletedRecord = await knex("review").where({ id: reviewId }).del();
    deletedRecord
      ? res.status(200).json({ DeletedrecordId: deletedRecord })
      : res.status(404).json({ message: "Record not found." });
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

module.exports = router;
