const { resTemp, errTemp, dataTemp } = require('../config');
const { ResourceModel } = require('../../db');
const fs = require('fs');
module.exports = (req, res) => {
  let { resourceId } = req.body;
  resourceId = resourceId.split(',');
  ResourceModel.find({ _id: { $in: resourceId } }).exec((err, file) => {
    var a = 1;
    for (let item of file) {
      var a = 1;
      fs.unlink(item.destination + '/' + item.filename, function (err) {
        if (err) throw err;
        console.log(a++ + item.originalname + '删除成功');
      });
    }
  });

  ResourceModel.deleteMany({ _id: { $in: resourceId } }).exec((err, result) => {
    if (!!err) return res.json(errTemp(err, '数据库错误'));
    if (!!resourceId) {
      (!!result.n > 0 && res.json(resTemp({ result }))) ||
        res.json(errTemp(err, '该数据不存在'));
    } else res.json(errTemp(err, '参数错误'));
  });
};
