const { UserModel } = require('../../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const { username, password } = req.body;
  // console.log('session', req.session);
  console.log('cookies', req.cookies);
  UserModel.findOne({ username }, '-updatedAt', (err, userInfo) => {
    if (err) return res.json(errTemp(err, '登录失败'));
    if (!userInfo) {
      return res.json(resTemp({ error: '用户名或密码错误' }));
    }
    const isPasswordValid = require('bcryptjs').compareSync(
      password,
      userInfo.password
    );
    if (isPasswordValid) {
      //生成token
      const TOKEN = jwt.sign({ id: userInfo.id }, SECRET);
      console.log('TOKEN', TOKEN);
      res.cookie('TOKEN', TOKEN, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json(resTemp({ success: true, TOKEN }));
    } else {
      res.json(resTemp({ error: '用户名或密码错误' }));
    }
  });
};
