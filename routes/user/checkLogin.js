const { UserModel } = require('../../db');
const md5 = require('blueimp-md5');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const { username, password } = req.body;
  console.log('========cookie==========', req.cookies);
  console.log('==========session===============', req.session);
  if (req.session.userInfo && req.cookies.sid) {
    res.send('欢迎再一次访问。');
    console.log('=================', req.session);
  } else {
    req.session.isLogin = true;
    res.send('欢迎第一次访问。');
  }
};
