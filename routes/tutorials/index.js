import { Router } from 'express';
import * as tutorialsController from './controller';

const tutorials = new Router();

tutorials.get('/', (req, res, next) => {
  res.json({ message: 'tutorial' });
});

tutorials.post('/', (req, res, next) => {});

export default tutorials;
