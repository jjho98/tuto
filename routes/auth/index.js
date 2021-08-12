import { Router } from 'express';
import * as authController from './controller';

const auth = new Router();
// 로그인 요청 시 token 새로 발행,
auth.post('/login', authController.login);
// 회원가입 시 token 새로 발행, 데이터 추가
auth.post('/join', authController.join);
export default auth;
