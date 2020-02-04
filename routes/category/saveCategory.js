const { resTemp, errTemp } = require('../config');
const { CategoryModel } = require('../../db');

module.exports = (req, res) => {
  console.log('req.body', req.body);
  const { id, updatedAt, createdAt, ...value } = req.body;

  if (!id) {
    CategoryModel.create(
      {
        ...value
      },
      (err, category) => {
        if (!err) res.json(resTemp('category', category));
        else {
          res.json(errTemp(err, ''));
        }
      }
    );
  } else {
    CategoryModel.findByIdAndUpdate(id, value, (err, category) => {
      if (!err) res.json(resTemp('category', category));
      else {
        res.json(errTemp(err, ''));
      }
    });
  }
};
