const { resTemp, errTemp, dataTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  const { id, ...value } = req.body;
  if (!id) {
    ArticleModel.create(value, (err, article) => {
      if (!err) res.json(resTemp({ article: dataTemp(article) }));
      else {
        res.json(errTemp(err, ''));
      }
    });
  } else {
    ArticleModel.findByIdAndUpdate(id, value, { new: true }, (err, article) => {
      if (!err) res.json(resTemp({ article: dataTemp(article) }));
      else {
        res.json(errTemp(err, ''));
      }
    });
  }
};
