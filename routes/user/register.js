const { UserModel } = require('../../db');
const md5 = require('blueimp-md5');
const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  const { username, password, ...value } = req.body;
  UserModel.findOne({ username }, (err, userInfo) => {
    if (err) return res.json(errTemp(err, ''));
    if (userInfo) {
      res.json(resTemp({ error: '创建失败，该用户已存在' }));
    } else {
      UserModel.create(
        { username, password: md5(password), ...value },
        (err, userInfo) => {
          if (err) return res.json(errTemp(err, ''));
          res.cookie('user_id', userInfo._id);
          res.json(resTemp({ userInfo: dataTemp(userInfo) }));
        }
      );
    }
  });
};
