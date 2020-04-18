const { resTemp, errTemp, dataTemp } = require('../config');
const { ResourceModel } = require('../../db');
module.exports = (req, res) => {
  ResourceModel.find()
    .sort({ type: -1 })
    .exec((err, resource) => {
      if (err) {
        return res.json(errTemp(err, '数据库出错'));
      }
      const baseUrl = req.protocol + '://' + req.get('host');

      const resourceList = dataTemp(resource).map((item) => {
        item.path = baseUrl + item.destination.slice(6) + '/' + item.name;
        return item;
      });
      console.log('resourceList', resourceList);
      res.json(resTemp({ resourceList }));
    });
};
