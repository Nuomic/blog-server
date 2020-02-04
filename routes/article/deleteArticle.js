const { resTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  const returnStatus = {
    customerErrorMessage: '删除失败',
    errorCode: '1',
    isSuccess: false
  };
  const { articleId, status } = req.body;
  if (!!articleId) {
    ArticleModel.findByIdAndDelete(articleId, err => {
      if (!err) res.json({ ...resTemp });
      else {
        res.json({
          ...resTemp,
          returnStatus: {
            ...returnStatus,
            errorMessage: err
          }
        });
      }
    });
  } else {
    res.json({
      ...resTemp,
      returnStatus: {
        ...returnStatus,
        errorMessage: err
      }
    });
  }
};
