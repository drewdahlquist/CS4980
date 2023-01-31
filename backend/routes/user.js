const express = require("express");

const userRoutes = express.Router();

// TODO: require db connection

userRoutes.route("/user").post(function (req, res) {
    res.send("post user");
});
  
userRoutes.route("/user/:id").get(function (req, res) {
    res.send("get user");
});

userRoutes.route("/user/:id").put(function (req, res) {
    res.send("put user");
});
  
userRoutes.route("/user/:id").delete(function (req, res) {
    res.send("delete user");
});

module.exports = userRoutes;
