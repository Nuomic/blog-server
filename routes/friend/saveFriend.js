const { resTemp, errTemp, dataTemp } = require('../config');
const { FriendModel } = require('../../db');
module.exports = (req, res) => {
  const { friendId, ...value } = req.body;
  if (!!friendId) {
    FriendModel.findByIdAndUpdate(friendId, value, (err, friend) => {
      if (!!err) return res.json(errTemp(err, '数据库错误，保存失败'));
      if (!!friend) res.json(resTemp('friend', friend));
      else {
        res.json(errTemp(err, '保存失败，此数据不存在'));
      }
    });
  } else {
    //friendId未传 则创建
    FriendModel.create(value, (err, friend) => {
      if (!!err) return res.json(errTemp(err, '数据库错误，保存失败'));

      console.log('friend', friend);
      res.json(resTemp('friend', dataTemp(friend)));
    });
  }
};
