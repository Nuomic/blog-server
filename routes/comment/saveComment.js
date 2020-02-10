const { resTemp, dataTemp, errTemp } = require('../config');
const { CommentModel } = require('../../db');

module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { parentId, articleId, ...value } = req.body;
  let comment = value;
  if (value.commentId) {
    const { commentId, likeCount } = value;
    CommentModel.findByIdAndUpdate(commentId, { likeCount }, err => {
      if (!err) res.json(resTemp());
    });
    return;
  }
  if (!!parentId) comment = { parentId, ...comment };
  if (!!articleId) comment = { articleId, ...comment };
  CommentModel.create(comment, (err, comment) => {
    if (err) {
      res.json(errTemp(err, '保存失败'));
      return;
    } else {
      res.json(resTemp({ comment }));
    }
  });
};
