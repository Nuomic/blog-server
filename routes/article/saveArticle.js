const { resTemp, dataTemp } = require('../config');
const { ArticleModel } = require('../../db');

module.exports = (req, res) => {
  const returnStatus = {
    customerErrorMessage: '保存失败',
    errorCode: '1',
    isSuccess: false
  };
  console.log('req.body', req.body);
  const { id, updatedAt, createdAt, ...value } = req.body;
  if (!id) {
    ArticleModel.create(value, (err, article) => {
      article = { id: article._id, ...article._doc };
      delete article._id;
      if (!err) res.json({ ...resTemp, ...article });
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
    ArticleModel.findByIdAndUpdate(id, value, err => {
      if (!err) res.json(resTemp);
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
  }
};
