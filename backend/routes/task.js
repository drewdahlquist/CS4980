const express = require("express");

const taskRoutes = express.Router();

// TODO: require db connection

taskRoutes.route("/user/:userId/task").post(function (req, res) {
    res.send("post task:"+req.params.taskId+" for user:"+req.params.userId);
});
  
taskRoutes.route("/user/:userId/task/:taskId").get(function (req, res) {
    res.send("get task:"+req.params.taskId+" for user:"+req.params.userId);
});

taskRoutes.route("/user/:userId/task/:taskId").put(function (req, res) {
    res.send("put task:"+req.params.taskId+" for user:"+req.params.userId);
});
  
taskRoutes.route("/user/:userId/task/:taskId").delete(function (req, res) {
    res.send("delete task:"+req.params.taskId+" for user:"+req.params.userId);
});

module.exports = taskRoutes;
