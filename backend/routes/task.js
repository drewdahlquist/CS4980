const express = require("express");

const taskRoutes = express.Router();

// TODO: require db connection

taskRoutes.route("/user/:userId/task").post(function (req, res) {
    res.send("post task:"+req.params.taskId+" for user:"+req.params.userId);
});
  
taskRoutes.route("/user/:userId/task/:taskId")
.get(function (req, res) {
    res.send(req.params);
})
.put(function (req, res) {
    res.send(req.params);
})
.delete(function (req, res) {
    res.send(req.params);
});

module.exports = taskRoutes;
