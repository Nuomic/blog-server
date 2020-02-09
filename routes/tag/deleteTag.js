const { resTemp, errTemp } = require('../config');
const { TagModel } = require('../../db');
module.exports = (req, res) => {
  let { tagId } = req.body;
  tagId = friendId.split(',');
  TagModel.deleteMany({ _id: { $in: tagId } }, (err, result) => {
    if (!!err) return res.json(errTemp(err, '数据库错误'));
    if (!!tagId) {
      (!!result.n > 0 && res.json(resTemp({ result }))) ||
        res.json(errTemp(err, '该数据不存在'));
    } else res.json(errTemp(err, '参数错误'));
  });
};
