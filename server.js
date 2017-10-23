const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bcrypt = require('bcrypt-as-promised');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = require('./routes/users');

app.use(users);


app.listen(port, function() {
  console.log("listening on port " + port + "...");
});
