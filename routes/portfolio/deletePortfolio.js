const { resTemp, errTemp } = require('../config');
const { PortfolioModel } = require('../../db');
module.exports = (req, res) => {
  let { portfolioId } = req.body;
  portfolioId = portfolioId.split(',');
  PortfolioModel.deleteMany({ _id: { $in: portfolioId } }, (err, result) => {
    if (!!err) return res.json(errTemp(err, '数据库错误'));
    if (!!portfolioId) {
      (!!result.n > 0 && res.json(resTemp({ result }))) ||
        res.json(errTemp(err, '该数据不存在'));
    } else res.json(errTemp(err, '参数错误'));
  });
};
