const { SettingModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = (req, res) => {
  const { type } = req.params;
  SettingModel.findOne({}, (err, setting) => {
    if (setting) {
      res.json(
        resTemp(type, { id: setting.toJSON()._id, ...setting.toJSON()[type] })
      );
    } else {
      res.json(errTemp(err, ''));
    }
  });
};
