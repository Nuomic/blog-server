const { UserModel } = require('../../db');
const jwt = require('jsonwebtoken');
const md5 = require('blueimp-md5');
const { SECRET } = require('../../config');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const { username, password } = req.body;
  console.log('session', req.session);
  console.log('cookies', req.cookies);
  UserModel.findOne(
    { username, password: md5(password) },
    '-password -updatedAt',
    (err, userInfo) => {
      if (err) return res.json(errTemp(err, '登录失败'));
      if (!userInfo) {
        return res.json(resTemp({ error: '用户名或密码错误' }));
      }
      const isPasswordValid = require('bcryptjs').compareSync(
        password,
        userInfo.password
      );
      if (isPasswordValid) {
        // req.session.userInfo = userInfo;
        // res.cookie('sid', req.session['connect.sid'], {
        //   maxAge: 1000 * 60 * 60 * 24 * 7,
        //   singed: true
        // });
        //生成token
        const token = jwt.sign({ id: userInfo.id }, SECRET);
        res.json(resTemp({ success: '登录成功' }));
      } else {
        res.json(resTemp({ error: '用户名或密码错误' }));
      }
    }
  );
};
