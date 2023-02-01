require('dotenv').config()

const express = require('express')
const cors = require('cors');

const app = express()
const port = 5001;

app.use(cors());
app.use(express.json());

const user = require('./routes/user.js');
const task = require('./routes/task.js');
app.use('/user', user);
app.use('/user/:id/task', task);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
