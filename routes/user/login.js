const { UserModel } = require('../../db');
const md5 = require('blueimp-md5');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne(
    { username, password: md5(password) },
    '-password -updatedAt',
    (err, userInfo) => {
      console.log('err', err);
      console.log('userInfo', userInfo);
      if (err) return res.json(errTemp(err, '登录失败'));
      if (userInfo) {
        res.json(resTemp({ userInfo: dataTemp(userInfo) }));
      } else {
        res.json(resTemp({ error: '用户名或密码错误' }));
      }
    }
  );
};
