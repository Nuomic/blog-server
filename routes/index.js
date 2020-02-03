const { baseUrl, version } = require('../config');
const api = require('../index');
module.exports = app => {
  api.forEach(item => {
    app.use('/' + version + baseUrl + item.path, item.router);
  });
};
