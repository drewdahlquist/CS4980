const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  // create task
  .post(function (req, res) {
    const text =
      "INSERT INTO tasks (user_id, name, description) VALUES ($1, $2, $3) RETURNING *";
    const userId = req.config.userId;
    const { name, desc } = req.body;

    pool.query(text, [userId, name, desc], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(result.rows[0]);
      }
    });
  })
  // list tasks
  .get(function (req, res) {
    const text = "SELECT * FROM tasks";
    pool.query(text, (err, result) => {
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
    const text = "SELECT * FROM tasks WHERE id = $1";
    const taskId = req.params.taskId;

    pool.query(text, [taskId], (err, result) => {
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
      "UPDATE tasks SET (name, description) = ($1, $2) WHERE id = $3 RETURNING *";
    const taskId = req.params.taskId;
    const { name, desc } = req.body;

    pool.query(text, [name, desc, taskId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows[0]);
      }
    });
  })
  // delete task by id
  .delete(function (req, res) {
    const text = "DELETE FROM tasks WHERE id = $1";
    const taskId = req.params.taskId;

    pool.query(text, [taskId], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send();
      }
    });
  });

module.exports = router;
