const { resTemp, errTemp } = require('../config');
const { FriendModel } = require('../../db');
module.exports = (req, res) => {
  let { friendId } = req.body;
  friendId = friendId.split(',');
  FriendModel.deleteMany({ _id: { $in: friendId } }, (err, result) => {
    if (!!err) return res.json(errTemp(err, '数据库错误'));
    if (!!friendId) {
      (!!result.n > 0 && res.json(resTemp({ result }))) ||
        res.json(errTemp(err, '该数据不存在'));
    } else res.json(errTemp(err, '参数错误'));
  });
};
