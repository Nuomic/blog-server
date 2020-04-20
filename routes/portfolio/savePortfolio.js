const { resTemp, errTemp, dataTemp } = require('../config');
const { PortfolioModel } = require('../../db');
module.exports = (req, res) => {
  const { portfolioId, ...value } = req.body;
  if (!!portfolioId) {
    PortfolioModel.findByIdAndUpdate(
      portfolioId,
      value,
      { new: true },
      (err, portfolio) => {
        if (!!err) return res.json(errTemp(err, '数据库错误，保存失败'));
        (!!portfolio && res.json(resTemp({ portfolio }))) ||
          res.json(errTemp(err, '保存失败，此数据不存在'));
      }
    );
  } else {
    //PortfolioId未传 则创建
    PortfolioModel.create(value, (err, portfolio) => {
      if (!!err) return res.json(errTemp(err, '数据库错误，保存失败'));
      res.json(resTemp({ portfolio: dataTemp(portfolio) }));
    });
  }
};
