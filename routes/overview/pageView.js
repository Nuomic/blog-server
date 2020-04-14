const { resTemp, errTemp, dataTemp } = require('../config');
const { PageModel } = require('../../db');
module.exports = (req, res) => {
  PageModel.find()
    .sort({ _id: -1 })
    .limit(90)
    .exec((err, page) => {
      if (err) res.json(errTemp(err, ''));
      res.json(resTemp({ pageList: dataTemp(page) }));
    });
};
