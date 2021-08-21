import { Router } from 'express';
import * as userController from './controller';
import upload from '../../lib/multer';

const users = new Router();
users.get('/me', userController.getMyInfo);
users.put('/me', upload.single('thumbnail'), userController.changeMyInfo);

export default users;
