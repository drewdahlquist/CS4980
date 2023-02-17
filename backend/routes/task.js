const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  // create task
  .post(function (req, res) {
    const text =
      "INSERT INTO tasks (user_id, name, description, due_date, status, priority, course, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const userId = req.config.userId;
    const { name, description, due_date, status, priority, course, type } = req.body;
    const values = [userId, name, description, due_date, status, priority, course, type];

    pool.query(text, [...values], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
  })
  // list tasks
  .get(function (req, res) {
    const text = "SELECT * FROM tasks WHERE user_id = $1";
    const userId = req.config.userId;

    pool.query(text, [userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    });
  });

router
  .route("/:taskId")
  // get task by id
  .get(function (req, res) {
    const text = "SELECT * FROM tasks WHERE id = $1 AND user_id = $2";
    const taskId = req.params.taskId;
    const userId = req.config.userId;

    pool.query(text, [taskId, userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    });
  })
  // update task by id
  .put(function (req, res) {
    const text =
      "UPDATE tasks SET (name, description) = ($1, $2) WHERE id = $3 AND user_id = $4 RETURNING *";
      const { name, description } = req.body;
      const taskId = req.params.taskId;
      const userId = req.config.userId;

    pool.query(text, [name, description, taskId, userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows[0]);
      }
    });
  })
  // delete task by id
  .delete(function (req, res) {
    const text = "DELETE FROM tasks WHERE id = $1 AND user_id = $2";
    const taskId = req.params.taskId;
    const userId = req.config.userId;

    pool.query(text, [taskId, userId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send();
      }
    });
  });

module.exports = router;
