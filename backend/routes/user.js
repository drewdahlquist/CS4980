const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  // create user
  .post(function (req, res) {
    const text =
      "INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { username, email, password, first_name, last_name } = req.body;
    const values = [username, email, password, first_name, last_name];

    pool.query(text, [...values], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
  })
  // list users
  .get(function (req, res) {
    const text = "SELECT * FROM users";

    pool.query(text, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    });
  });

router
  .route("/:userId")
  // get user by id
  .get(function (req, res) {
    const text = "SELECT * FROM users WHERE id = $1";
    const userId = req.params.userId;

    pool.query(text, [userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    });
  })
  // update user by id
  .put(function (req, res) {
    const text =
      "UPDATE users SET (name, email) = ($1, $2) WHERE id = $3 RETURNING *";
    const userId = req.params.userId;
    const { username, email } = req.body;

    pool.query(text, [username, email, userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows[0]);
      }
    });
  })
  // delete user by id
  .delete(function (req, res) {
    const text = "DELETE FROM users WHERE id = $1";
    const userId = req.params.userId;

    pool.query(text, [userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send();
      }
    });
  });

module.exports = router;
