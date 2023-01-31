const express = require("express");

const taskRoutes = express.Router();

// TODO: require db connection

taskRoutes.route("/user/:id/task").post(function (req, res) {
    res.send("post task");
});
  
taskRoutes.route("/user/:id/task/:id").get(function (req, res) {
    res.send("get task");
});

taskRoutes.route("/user/:id/task/:id").put(function (req, res) {
    res.send("put task");
});
  
taskRoutes.route("/user/:id/task/:id").delete(function (req, res) {
    res.send("delete task");
});

module.exports = taskRoutes;
