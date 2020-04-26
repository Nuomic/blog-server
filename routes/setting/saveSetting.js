const { SettingModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = (req, res) => {
  const { type, id, ...value } = req.body;

  SettingModel.updateOne(
    { _id: id },
    { [type]: value },
    { upsert: true },
    (err) => {
      if (err) return;
      else res.json(resTemp());
    }
  );
  // findByIdAndUpdate(id, { [type]: value }, err => {
  //   if (err) {
  //     console.log('更新失败');
  //   } else {
  //     res.json(resTemp());
  //   }
  // });
};
