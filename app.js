const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import logger from './logger';
import routes from './routes';
import { sequelize } from './models';

// db connect
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else {
    logger.error(err.message);
  }

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
