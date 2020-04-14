const { resTemp, errTemp, dataTemp } = require('../config');
const { PageModel } = require('../../db');
module.exports = (req, res) => {
  PageModel.find()
    .sort({ _id: -1 })
    .exec((err, page) => {
      if (err) return res.json(errTemp(err, ''));
      const pageList = dataTemp(page);
      const pvTotal = pageList.reduce(
        (pre, curr) =>
          (pre += curr.pageInfo.reduce((pre, curr) => (pre += curr.pv), 0)),
        0
      );
      res.json(resTemp({ pageList: pageList.slice(0, 90), pvTotal }));
    });
};
