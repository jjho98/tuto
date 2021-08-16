require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import mongoose from 'mongoose';
import logger from './logger';

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
import routes from './routes';

const app = express();
app.use('/api', routes);

if (process.env.ENV == 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 설정
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.error(err.message);

  const message =
    process.env.ENV === 'development' ? err : { message: '서버 에러 발생' };
  // render the error page
  res.status(err.status || 500);
  res.json(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
