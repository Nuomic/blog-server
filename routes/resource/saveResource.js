const pathLib = require('path');
const { ResourceModel } = require('../../db');
module.exports = (req, res) => {
  const { file, body } = req;
  //文件地址
  const fullUrl =
    req.protocol +
    '://' +
    req.get('host') +
    file.destination.slice(6) +
    '/' +
    file.filename;
  console.log('fullUrl', fullUrl);
  const ext = pathLib.parse(file.originalname).ext;
  ResourceModel.create(
    {
      ext,
      type: body.folder,
      // name: file.filename,
      path: fullUrl,
      isTrash: false,
      originalname: file.originalname,
    },
    (err, file) => {
      if (err) {
        console.log('err', err);
        return res.json({
          errMsg: err,
          status: 'error',
        });
      }
      res.json({ name: file.originalname, status: 'done', url: fullUrl });
    }
  );
};
