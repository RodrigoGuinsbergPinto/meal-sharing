const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const knex = require("./database");

const mealsRouter = require("./api/meals");
const reservRouter = require("./api/reservations"); ////////////////////////////////

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservRouter); ////////////////////////////////////////

// app.get("/my-route", (req, res) => {
//   res.send("Hi friend");
// });

// /future-meals	Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` >= NOW()");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /past-meals	Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` < NOW()");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /all-meals	Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id`");
    rows[0].length === 0 ? res.status(200).send(rows[0]) : res.send(rows[0]);
  } catch (err) {
    res.statusCode = 500;
    res.send(`💥Error: ${err.message}`);
  }
});

// /first-meal	Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
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
app.get("/last-meal", async (req, res) => {
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

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
