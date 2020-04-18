const { resTemp, errTemp } = require('../config');
const { ResourceModel } = require('../../db');
module.exports = (req, res) => {
  const { resourceId, ...value } = req.body;
  const ids = resourceId.split(',');
  ResourceModel.updateMany({ _id: { $in: ids } }, { $set: value }, (err) => {
    console.log('err', err);
    if (!err) res.json(resTemp());
    else {
      console.log('err', err);
      res.json(errTemp(err));
    }
  });
};
