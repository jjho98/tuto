import { Router } from 'express';
import * as userController from './controller';

const users = new Router();
users.get('/me', userController.getMyInfo);

export default users;
