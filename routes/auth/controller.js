import * as userController from '../users/controller';
import bcrypt from 'bcrypt';
import issueToken from '../../lib/issueToken';

// 회원가입
// 토큰 발행
export const join = async (req, res, next) => {
  try {
    // 필드별 필요한 제약 추가하기
    // 이메일, 패스워드, 닉네임, 썸네일 중에 작성 안 된 게 있을 시
    const { email, password, nickname, thumbnail } = req.body;
    if (!email || !password || !nickname || !thumbnail) {
      return res.status(400).json({
        message: '이메일, 비밀번호, 닉네임, 썸네일은 필수 항목입니다',
      });
    }

    // nickname 길이 안 맞을 시
    if (nickname.length < 1 && nickname.length > 10) {
      return res
        .status(400)
        .json({ message: '닉네임은 1글자 이상 10글자 이하여야 합니다' });
    }

    // 가입된 이메일
    const isUsingEmail = await userController.verifyEmail(email);
    if (isUsingEmail) {
      return res.status(400).json({ message: '이미 가입된 이메일입니다' });
    }

    // 존재하는 닉네임
    const isUsingNickname = await userController.verifyNickname(nickname);
    if (isUsingNickname) {
      return res.status(400).json({ message: '이미 사용 중인 닉네임입니다' });
    }

    // 비밀번호 암호화해서 저장
    req.body.password = await bcrypt.hash(password, 10);
    const user = await userController.create(req.body);

    // 토큰 발행
    const token = await issueToken(user.id);
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    next(err);
  }
};

// 로그인
// 토큰 발행
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return req
        .status(400)
        .json({ message: '이메일과 비밀번호를 입력하세요' });
    }

    const user = await userController.readByEmail(email);
    // 해당 이메일로 가입된 유저가 없을 시
    if (!user) {
      return res
        .status(401)
        .json({ messsage: '해당 이메일로 가입된 계정은 없습니다' });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    // 비밀번호가 일치하지 않을 시
    if (!isCorrect) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    // 유저 데이터 일치 시
    // 토큰 발행
    const token = await issueToken(user.id);
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.status(200).json({ message: '로그인 성공' });
  } catch (err) {
    next(err);
  }
};
