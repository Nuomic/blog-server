const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  const { articleId } = req.body;
  if (!!articleId) {
    ArticleModel.findByIdAndDelete(articleId, (err, article) => {
      if (err) res.json(errTemp(err, '删除失败'));
      else {
        (!!article && res.json(resTemp())) ||
          res.json(errTemp(err, '文章不存在'));
      }
    });
  } else {
    res.json(errTemp(err, '参数错误 请传入articleId'));
  }
};
