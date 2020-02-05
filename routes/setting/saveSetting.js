const { SettingModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = (req, res) => {
  const { type, id, ...value } = req.body;

  SettingModel.findByIdAndUpdate(id, { [type]: value }, err => {
    if (err) {
      console.log('更新失败');
    } else {
      res.json(resTemp());
    }
  });
};
