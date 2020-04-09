const { UserModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  // const { username, password, userid } = req.body;
  console.log('req.cookies', req.cookies);
  res.clearCookie('TOKEN');
  res.json(errTemp({}, '退出成功', '401', 'fail'));
};
