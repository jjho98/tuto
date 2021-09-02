import { Router } from 'express';
import upload from '../../lib/multer';
import * as tutorialsController from './controller';

const tutorials = new Router();

// id로 해당 튜토리얼 정보 보기
tutorials.get('/:id', tutorialsController.getDetail);
// category에 해당하는 튜토리얼들 모아보기
tutorials.get('/category/:category', tutorialsController.list);
// 튜토리얼 생성
tutorials.post('/', upload.single(), tutorialsController.create);

export default tutorials;
