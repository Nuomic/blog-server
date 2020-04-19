const pathLib = require('path');
const { resTemp, errTemp, dataTemp } = require('../config');
const { ResourceModel } = require('../../db');
const { domain } = require('../../config');
module.exports = (req, res) => {
  const { file, body } = req;
  console.log('file', file);
  //文件地址
  const fullUrl =
    req.protocol + '://' + domain + file.destination + '/' + file.filename;

  console.log('fullUrl', fullUrl);
  const ext = pathLib.parse(file.originalname).ext;
  ResourceModel.create(
    {
      ...file,
      ext,
      type: body.folder,
      isTrash: false,
      editTime: new Date(),
    },
    (err, file) => {
      if (err) {
        console.log('err', err);
        return res.json({
          errMsg: err,
          status: 'error',
        });
      }
      res.json({
        ...dataTemp(file),
        status: 'done',
        path: fullUrl,
      });
    }
  );
};
