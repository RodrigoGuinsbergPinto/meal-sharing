const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET - return all meals
router.get("/", async (req, res) => {
  try {
    let query = knex("meal");

    if ("maxPrice" in req.query) {
      const maxPrice = parseInt(req.query.maxPrice);
      if (!isNaN(maxPrice)) query = query.where("price", "<", maxPrice);
      else {
        return res
          .status(404)
          .send(`Error: 💥 Please provide a maxprice for the meal.`);
      }
    }

    if ("title" in req.query) {
      const title = req.query.title;
      query = query.where("title", "like", `%${title}%`);
    }

    if (req.query.availableReservations === "true") {
      query = query
        .select(
          knex.raw(
            ` meal.id,meal.title,meal.max_reservations , sum(reservation.number_of_guests)as 'totalReservations'`
          )
        )
        .join("reservation", "reservation.meal_id", "=", "meal.id")
        .groupBy("meal.id")
        .having("meal.max_reservations", ">", "totalReservations");
    }

    if ("dateAfter" in req.query) {
      const dateAfter = new Date(req.query.dateAfter);
      if (dateAfter != "Invalid Date") {
        query = query.where("when", ">", dateAfter);
      } else {
        return res
          .status(404)
          .send(
            `Error: 💥 Please provide a valid dateAfter field in the query.`
          );
      }
    }

    if ("dateBefore" in req.query) {
      const dateBefore = new Date(req.query.dateBefore);
      if (dateBefore && dateBefore != "Invalid Date") {
        console.log(dateBefore);
        query = query.where("when", "<", dateBefore);
      } else {
        return res
          .status(404)
          .send(
            `Error: 💥 Please provide a valid dateBefore field in the query.`
          );
      }
    }

    if ("limit" in req.query) {
      const limit = parseInt(req.query.limit);
      if (!isNaN(limit)) {
        query = query.limit(limit);
      } else {
        return res
          .status(404)
          .send(`Error: 💥 Please provide a valid limit value in the query.`);
      }
    }

    if ("sortKey" in req.query) {
      const orderBy = req.query.sortKey.toString().trim();
      if (
        orderBy === "price" ||
        orderBy === "when" ||
        orderBy === "max_reservations"
      ) {
        if ("sortDir" in req.query) {
          let sortOrder = req.query.sortDir.toString().trim().toUpperCase();
          query = query.orderBy(orderBy, sortOrder);
        } else {
          query = query.orderBy(orderBy);
        }
      } else {
        res.send(`Error: 💥 Invalid sort key.`);
      }
    }

    const data = await query;
    data.length
      ? res.status(200).json(data)
      : res.send(`No meal matches your search.
    `);
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

router.get("/:meal_id/reviews", async (req, res) => {
  try {
    const meal = await knex("meal")
      .select("id", "title")
      .where("id", "=", `${parseInt(req.params.meal_id)}$`);
    if (meal.length === 0) return res.status(404).send(`Not a valid meal id.`);
    const review = await knex("review")
      .select("*")
      .where("meal_id", "=", `${parseInt(req.params.meal_id)}$`);
    review.length === 0
      ? res.status(404).send(`Be the first to write a review for this meal.`)
      : res.status(200).json(review);
  } catch (e) {
    res.status(503).send(`${e.message}`);
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
