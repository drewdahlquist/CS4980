const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  // create task
  .post(function (req, res) {
    console.log(req.body);
    res.send(req.params);
  })
  // list tasks
  .get(function (req, res) {
    console.log(req.body);
    res.send(req.params);
  });

router
  .route("/:taskId")
  // get task by id
  .get(function (req, res) {
    console.log(req.body);
    res.send(req.params);
  })
  // update task by id
  .put(function (req, res) {
    console.log(req.body);
    res.send(req.params);
  })
  // delete task by id
  .delete(function (req, res) {
    console.log(req.body);
    res.send(req.params);
  });

module.exports = router;
