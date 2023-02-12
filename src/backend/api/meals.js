const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// /future-meals	Respond with all meals in the future (relative to the when datetime)
router.get("/future-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` >= NOW()");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /past-meals	Respond with all meals in the past (relative to the when datetime)
router.get("/past-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` < NOW()");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /all-meals	Respond with all meals sorted by ID
router.get("/all-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id`");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /first-meal	Respond with the first meal (meaning with the minimum id)
router.get("/first-meal", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` LIMIT 1");
    rows[0].length === 0
      ? res.status(404).send(`No meals registered in database.`)
      : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /last-meal	Respond with the last meal (meaning with the maximum id)
router.get("/last-meal", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` desc");
    rows[0].length === 0
      ? res.status(404).send(`No meals registered in database.`)
      : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

module.exports = router;
