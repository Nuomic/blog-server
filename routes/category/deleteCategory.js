const { resTemp, errTemp } = require('../config');
const { CategoryModel } = require('../../db');

module.exports = (req, res) => {
  const { categoryId } = req.body;
  if (!!categoryId) {
    CategoryModel.findByIdAndDelete(categoryId, err => {
      if (!err) res.json(resTemp());
      else {
        res.json(errTemp(err, ''));
      }
    });
  } else {
    res.json(errTemp(err, ''));
  }
};
