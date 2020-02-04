const { resTemp, errTemp } = require('../config');
const { CommentModel } = require('../../db');
module.exports = (req, res) => {
  const { commentId } = req.body;
  if (!!commentId) {
    CommentModel.findByIdAndDelete(commentId, (err, comment) => {
      console.log('comment', comment);
      if (err) res.json(errTemp(err, '删除失败'));
      else {
        comment && res.json(resTemp());
        !comment && res.json(errTemp(err, '评论不存在'));
      }
    });
  } else {
    res.json(errTemp(err, '评论不存在'));
  }
};
