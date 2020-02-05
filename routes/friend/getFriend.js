const { resTemp, errTemp, dataTemp } = require('../config');
const { FriendModel } = require('../../db');
module.exports = (req, res) => {
  const { friendId } = req.query;
  const getFriend = (err, friend) => {
    if (!!err) {
      res.json(errTemp(err, '数据库出错'));
      return;
    }
    (!!friend && res.json(resTemp('friendList', dataTemp(friend)))) ||
      res.json(errTemp(err, '数据不存在'));
  };
  !!friendId
    ? FriendModel.findById(friendId, getFriend)
    : FriendModel.find(null, null, { sort: [{ _id: -1 }] }, getFriend);
};
