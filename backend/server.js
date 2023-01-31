require('dotenv').config()

const express = require('express')
const cors = require("cors");

const app = express()
const port = 5001;

app.use(cors());
app.use(express.json());
app.use(require("./routes/user.js"));
app.use(require("./routes/task.js"));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
