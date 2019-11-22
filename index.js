const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
const passport = require('passport');
const users = require('./routes/user_routes/user');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 1234;

// connect to the databbase
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/auth/users', users);

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// when start a server
// lsof -i tcp:1234
// kill -15 57385
// change mlab ipaddress in Network Access tab
