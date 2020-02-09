const { UserModel } = require('../../db');
const { resTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { username, password, userid } = req.body;
  if (userid) {
  } else
    UserModel.findOne({ username }, (err, user) => {
      if (user) {
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.json({
          //服务端解析成JSON后响应
          ...resTemp,
          userInfo: user
        });
      } else {
        let { returnStatus } = resTemp;
        returnStatus = {
          ...returnStatus,
          isSuccess: false
        };
        res.send({ ...resTemp, ...returnStatus });
      }
    });
};
