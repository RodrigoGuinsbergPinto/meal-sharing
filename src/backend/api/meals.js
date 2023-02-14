const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - return all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("*");
    res.json(meals);
  } catch (err) {
    res.status(500).send(`Error: 💥 ${err.message}`);
  }
});

// POST - adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const insertMeal = await knex("meal").insert(newMeal);
    res.status(201).json(insertMeal);
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// GET - returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const mealId = parseInt(req.params.id);
    const meal = await knex("meal").select("*").where({ id: mealId });
    if (meal.length === 0) {
      res.status(404).send(`Id ${mealId} not found.`);
    } else res.status(200).json({ expectedmeal: meal });
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// PUT - updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const mealId = parseInt(req.params.id);
    const updatedMeal = await knex("meal")
      .where({ id: mealId })
      .update(req.body);
    if (updatedMeal) {
      res.status(200).json({ MealUpdated: mealId });
    } else res.status(404).send("Id not found.");
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

// DELETE - deletes the meals by id
router.delete("/:id", async (req, res) => {
  try {
    const mealId = parseInt(req.params.id);
    const deletedMeal = await knex("meal").where({ id: mealId }).del();
    if (deletedMeal) {
      res.status(200)._construct.json({ DeletedMeal: deletedMeal });
    } else {
      res.status(404).json({ message: "Meal id not valid." });
    }
  } catch (err) {
    res.status(503).send(`Error: 💥 ${err.message}`);
  }
});

module.exports = router;
