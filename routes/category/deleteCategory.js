const { resTemp, errTemp } = require('../config');
const { CategoryModel } = require('../../db');

module.exports = (req, res) => {
  const { categoryId } = req.body;
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
