const express = require("express");

const userRoutes = express.Router();

// TODO: require db connection

userRoutes.route("/user").post(function (req, res) {
    res.send("post user");
});
  
userRoutes.route("/user/:userId")
.get(function (req, res) {
    res.send(req.params);
})
.put(function (req, res) {
    res.send(req.params);
})
.delete(function (req, res) {
    res.send(req.params);
});

module.exports = userRoutes;
