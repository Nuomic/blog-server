const { resTemp, dataTemp, errTemp } = require('../config');
const { CommentModel } = require('../../db');

module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { parentId, articleId, ...value } = req.body;
  console.log('11111', 11111);
  let comment = value;
  if (!!parentId) comment = { parentId, ...comment };
  if (!!articleId) comment = { articleId, ...comment };
  CommentModel.create(comment, (err, comment) => {
    if (err) {
      res.json(errTemp(err, '保存失败'));
      return;
    } else {
      res.json(resTemp('comment', comment));
    }
  });
};
