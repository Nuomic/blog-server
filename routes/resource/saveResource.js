var multer = require('multer');
var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '/public');
    },
    filename: function(req, file, cb) {
      //file.originalname上传文件的原始文件名
      var changedName = new Date().getTime() + '-' + file.originalname;
      cb(null, changedName);
    }
  })
});
let multipleFields = upload.fields([
  { name: 'avatar' },
  { name: 'gallery', maxCount: 3 }
]);
module.exports = (req, res) => {
  multipleFields(req, res, err => {
    console.log(req.files);
    if (!!err) {
      console.log(err.message);
      res.json({
        code: '2000',
        type: 'field',
        msg: err.message
      });
      return;
    }
    var fileList = [];
    for (let item in req.files) {
      var fieldItem = req.files[item];
      fieldItem.map(elem => {
        fileList.push({
          fieldname: elem.fieldname,
          originalname: elem.originalname
        });
      });
    }
    res.json({
      code: '0000',
      type: 'field',
      fileList: fileList,
      msg: ''
    });
  });
};
