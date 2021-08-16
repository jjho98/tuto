import { Router } from 'express';
import * as tutorialsController from './controller';

const tutorials = new Router();

tutorials.get('/', (req, res, next) => {
  return res.json('a');
});
tutorials.get('/:category', tutorialsController.list);

export default tutorials;
