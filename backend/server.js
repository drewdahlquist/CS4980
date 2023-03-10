const config = require("config");

const express = require("express");
const cors = require("cors");
const port = config.get("API_PORT") || 4980;
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use(
  "/user/:userId/task",
  (req, res, next) => {
    req.config = {
      userId: req.params.userId,
    };
    next();
  },
  taskRouter
);

// Easy check if server up
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
