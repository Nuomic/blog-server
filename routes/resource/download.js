const { resTemp, errTemp, dataTemp } = require('../config');
const { ResourceModel } = require('../../db');
const fs = require('fs');
module.exports = (req, res) => {
  let { resourceId } = req.query;

  ResourceModel.findById(resourceId).exec((err, file) => {
    console.log('file', file);
    if (file) {
      res.set({
        'Content-type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=' + encodeURI(fileName),
      });
      // fReadStream = fs.createReadStream(currFile);
      // fReadStream.on('data', function (chunk) {
      //   res.write(chunk, 'binary');
      // });
      // fReadStream.on('end', function () {
      //   res.end();
      // });
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition':
          'attachment; filename=' + encodeURI(file.originalname),
        'Content-Length': file.size,
      });
      fs.createReadStream(file.destination + '/' + file.filename).pipe(res);
    } else {
      res.json(errTemp(err));
    }

    // res.download(file.destination + '/' + file.filename);
  });
};
