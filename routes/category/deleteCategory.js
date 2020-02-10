const { resTemp, errTemp } = require('../config');
const { CategoryModel } = require('../../db');

module.exports = (req, res) => {
  const { categoryId, articleCount } = req.body;
  if (articleCount > 0)
    return res.json(errTemp({}, '该栏目不为空，无法删除！'));
  if (!!categoryId) {
    CategoryModel.findByIdAndDelete(categoryId, (err, category) => {
      if (!!err) res.json(errTemp(err, ''));
      else {
        (!!category && res.json(resTemp())) || res.json(errTemp(err, ''));
      }
    });
  } else {
    res.json(errTemp(err, ''));
  }
};
