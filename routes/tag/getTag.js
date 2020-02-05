const { resTemp, errTemp, dataTemp } = require('../config');
const { TagModel } = require('../../db');
module.exports = (req, res) => {
  const { tagId } = req.query;
  const getTag = (err, tag) => {
    if (!!err) {
      res.json(errTemp(err, '数据库出错'));
      return;
    }
    (!!tag && res.json(resTemp('tagList', dataTemp(tag)))) ||
      res.json(errTemp(err, '数据不存在'));
  };
  !!tagId
    ? TagModel.findById(tagId, getTag)
    : TagModel.find(null, null, { sort: [{ _id: -1 }] }, getTag);
};
