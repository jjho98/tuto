require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import mongoose from 'mongoose';
import Category from './models/category';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongoDB');
    // category mock data
    // const categories = [...new Array(40).keys()].map((id) => ({
    //   name: `cateogry${id}`,
    // }));
    // Category.insertMany(categories, (err, docs) => {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log(docs);
    // });
  })
  .catch((e) => {
    console.error(e);
  });

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
import tutorials from './routes/tutorials';
import categories from './routes/categories';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/tutorials', tutorials);
app.use('/categories', categories);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: '에러 발생' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
