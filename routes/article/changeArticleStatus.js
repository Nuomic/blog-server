const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');
const { Types } = require('mongoose');
module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { articleId, status } = req.body;
  if (!!articleId) {
    let value = { status };
    if (status == 3)
      value = {
        ...value,
        categoryId: '5e3d00cf765d392e685654b3'
      };
    ArticleModel.findByIdAndUpdate(articleId, value, (err, article) => {
      if (!!err) return res.json(errTemp(err, ''));
      (!!article && res.json(resTemp({ article }))) ||
        res.json(errTemp(err, ''));
    });
  } else {
  }
};
