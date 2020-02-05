const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { articleId, status } = req.body;
  if (!!articleId) {
    ArticleModel.findByIdAndUpdate(articleId, { status }, (err, article) => {
      if (!!err) return res.json(errTemp(err, ''));
      (!!article && res.json(resTemp('article', article))) ||
        res.json(errTemp(err, ''));
    });
  } else {
  }
};
