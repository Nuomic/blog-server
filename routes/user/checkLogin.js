const { UserModel } = require('../../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const TOKEN = req.cookies.TOKEN;
  console.log('TOKEN', TOKEN);
  if (!TOKEN) {
    return res.json(errTemp({}, '登录失效，请重新登录', '401', 'fail'));
  }
  const tokenData = jwt.verify(TOKEN, SECRET);
  UserModel.findById(tokenData.id, '-password -updatedAt', (err, userInfo) => {
    if (err) return res.json(errTemp(err, '登录失效，请重新登录', '401'));
    if (userInfo) res.json(resTemp({ userInfo: dataTemp(userInfo) }));
    else res.json(errTemp({}, '登录失效，请重新登录', '401', 'fail'));
  });
};
