require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.API_PORT || 5001;
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/user/:id/task", taskRouter);

// Easy check if server up
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
