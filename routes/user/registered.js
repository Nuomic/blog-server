const { UserModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { username, password, userid } = req.body;
  if (userid) {
  } else
    UserModel.findOne({ username }, (err, userInfo) => {
      if (user) {
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        //服务端解析成JSON后响应
        res.json(resTemp({ userInfo }));
      } else {
        res.send(errTemp(err, ''));
      }
    });
};
