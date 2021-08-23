import { Router } from 'express';
import * as userController from './controller';
import upload from '../../lib/multer';
import { getMyPortfolios } from '../portfolios/controller';
import { getMyTutorials } from '../tutorials/controller';

const users = new Router();
users.get('/me', userController.getMyInfo);
users.put('/me', upload.single('thumbnail'), userController.changeMyInfo);
// 본인 작품 모아보기
users.get('/me/portfolios', getMyPortfolios);
// 본인이 올린 튜토리얼 모아보기
users.get('/me/tutorials', getMyTutorials);
export default users;
