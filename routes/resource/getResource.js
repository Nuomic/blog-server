const { resTemp, errTemp, dataTemp } = require('../config');
const { ResourceModel } = require('../../db');
const { domain } = require('../../config');

module.exports = (req, res) => {
  ResourceModel.find()
    .sort({ type: -1 })
    .exec((err, resource) => {
      if (err) {
        return res.json(errTemp(err, '数据库出错'));
      }
      console.log('obj===================ect', req.get('host'));
      const baseUrl = req.protocol + '://' + domain + '/';

      const resourceList = dataTemp(resource).map((item) => {
        item.path = baseUrl + item.destination + '/' + item.filename;
        return item;
      });
      // console.log('resourceList', resourceList);
      res.json(resTemp({ resourceList }));
    });
};
