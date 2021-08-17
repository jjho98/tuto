require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import logger from './logger';
import routes from './routes';
import jwtVerify from './routes/middlewares/jwtVerify';

// db connect
const sequelize = require('./models').sequelize;
sequelize.sync();
console.log('mysql db connected');

const app = express();

app.use(jwtVerify);
app.use('/api', routes);

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.error(err.message);

  const message =
    process.env.NODE_ENV === 'development'
      ? err
      : { message: '서버 에러 발생' };
  // render the error page
  res.status(err.status || 500);
  res.json(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
