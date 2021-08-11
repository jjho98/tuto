/* eslint-disable no-global-assign */
// eslint에서 파일 하나만 옵션 바꾸는 법

require = require('esm')(module);
module.exports = require('./app.js');
