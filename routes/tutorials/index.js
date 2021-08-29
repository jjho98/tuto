import { Router } from 'express';
import * as tutorialsController from './controller';

const tutorials = new Router();

tutorials.get('/:category', tutorialsController.list);
tutorials.get('/', (req, res, next) => {
  return res.json('a');
});
// 튜토리얼 생성
tutorials.post('/', tutorialsController.create);

export default tutorials;
