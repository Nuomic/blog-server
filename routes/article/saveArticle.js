const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { id, updatedAt, createdAt, ...value } = req.body;
  if (!id) {
    ArticleModel.create(value, (err, article) => {
      article = { id: article._id, ...article._doc };
      delete article._id;
      if (!err) res.json(resTemp('article', article));
      else {
        res.json(errTemp(err, ''));
      }
    });
  } else {
    ArticleModel.findByIdAndUpdate(id, value, err => {
      if (!err) res.json(resTemp);
      else {
        res.json(errTemp(err, ''));
      }
    });
  }
};
