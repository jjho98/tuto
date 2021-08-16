import { Router } from 'express';
import * as categoryController from './controller';
const categories = new Router();

categories.get('/', categoryController.list);
// categories.post('/', categoryController.create);

export default categories;
