const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');
const { Types } = require('mongoose');
module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { articleId, status, articleIds, toCategoryId } = req.body;
  if (!!articleId && status) {
    ArticleModel.findByIdAndUpdate(articleId, { status }, (err, article) => {
      if (!!err) return res.json(errTemp(err, ''));
      (!!article && res.json(resTemp({ article }))) ||
        res.json(errTemp(err, '文章不存在'));
    });
  } else if (articleIds && toCategoryId) {
    var ids = articleIds.split(',');
    ArticleModel.updateMany(
      { _id: { $in: ids } },
      { $set: { categoryId: toCategoryId } },
      err => {
        console.log('err', err);
        if (!err) res.json(resTemp());
      }
    );
  } else {
    res.json(errTemp({}, '参数错误'));
  }
};
