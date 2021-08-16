import { Router } from 'express';
import * as tutorialsController from './controller';

const tutorials = new Router();

tutorials.get('/:category', tutorialsController.list);
tutorials.get('/', (req, res, next) => {
  return res.json('a');
});

export default tutorials;
