const multer = require('multer');
const pathLib = require('path');
const fs = require('fs');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { folder } = req.body;
      const path = `public/${folder}`;
      fs.mkdir(path, function (error) {
        if (error) {
          return;
        }
        console.log('创建目录成功');
      });
      cb(null, path);
    },
    filename: function (req, file, cb) {
      //file.originalname上传文件的原始文件名
      //文件后缀
      const ext = pathLib.parse(file.originalname).ext;
      const changedName = new Date().getTime() + ext;
      cb(null, changedName);
    },
  }),
});
module.exports = upload.single('file');
