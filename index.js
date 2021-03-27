const express = require('express');
const app = express();
// app.use(require('cors')())
const things = require('./things');


// request 解析body  multer用于解析multipart/form数据
const bodyParser = require('body-parser', { useNewUrlParser: true });
const multer = require('multer');
const upload = multer();
// parse various different custom JSON types as JSON
app.use(bodyParser.json())
// form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// for parsing multipart/form-data
app.use(upload.array());


app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method == 'OPTIONS') return res.status(200).send('OK')
  next()
});




// cookie session
const cookieParser = require('cookie-parser');
app.use(cookieParser("s1e2c3r4e5t6"));
const session = require('express-session');
app.use(session({
  secret: 'k089eyb0890oar890909dciopat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bingyan', { useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("database connection success");
});






app.use('/api', things);
app.listen(8082)




/*  err code
 *  4000    params wrong
 *  4001    username or password incorrect
 *  4002    not login
 *  4003    user not exist
 *
 *
 *
 *
 *
 *
 *  4444 database wrong
 *
 *
 *
 *
 */