const express = require("express");

const userRoutes = express.Router();

// TODO: require db connection

userRoutes.route("/user").post(function (req, res) {
    res.send("post user");
});
  
userRoutes.route("/user/:userId").get(function (req, res) {
    res.send("get user:"+req.params.userId);
});

userRoutes.route("/user/:userId").put(function (req, res) {
    res.send("put user:"+req.params.userId);
});
  
userRoutes.route("/user/:userId").delete(function (req, res) {
    res.send("delete user:"+req.params.userId);
});

module.exports = userRoutes;
