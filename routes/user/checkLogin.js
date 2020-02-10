const { UserModel } = require('../../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  console.log('TOKEN', req.headers.authorization);
  const TOKEN = String(req.headers.authorization)
    .split(' ')
    .pop();
  const tokenData = jwt.verify(TOKEN, SECRET);
  UserModel.findById(tokenData, '-password -updatedAt', (err, userInfo) => {
    if (err) return res.json(errTemp(err, '失效'));
    res.json(resTemp({ userInfo }));
  });
};
