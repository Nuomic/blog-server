const { Router } = require('express');
const { SettingModel } = require('../../db');
const { resTemp } = require('../config');
const router = Router();
// const filter = { password: 0, _v: 0 };
module.exports = router;
router.get('/get/:type', (req, res) => {
  const { type } = req.params;
  SettingModel.findOne({}, (err, setting) => {
    if (setting) {
      res.json({
        ...resTemp,
        [type]: { id: setting.toJSON()._id, ...setting.toJSON()[type] }
      });
    } else {
    }
  });
});
router.post('/save', (req, res) => {
  const { type, id, ...value } = req.body;

  SettingModel.findByIdAndUpdate(id, { [type]: value }, err => {
    if (err) {
      console.log('更新失败');
    } else {
      res.json({
        ...resTemp
      });
    }
  });
});
