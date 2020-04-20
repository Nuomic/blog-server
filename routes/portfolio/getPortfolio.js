const { resTemp, errTemp, dataTemp } = require('../config');
const { PortfolioModel } = require('../../db');
module.exports = (req, res) => {
  const { portfolioId } = req.query;
  const getPortfolio = (err, portfolio) => {
    if (!!err) {
      res.json(errTemp(err, '数据库出错'));
      return;
    }
    (!!portfolio &&
      res.json(resTemp({ portfolioList: dataTemp(portfolio) }))) ||
      res.json(errTemp(err, '数据不存在'));
  };
  (!!portfolioId
    ? PortfolioModel.findById(portfolioId)
    : PortfolioModel.find()
  ).exec(getPortfolio);
};
