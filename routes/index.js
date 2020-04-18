const { baseUrl, version } = require('../config');
const api = require('../index');
module.exports = (app) => {
  api.forEach((item) => {
    app.use(
      (baseUrl || '/api') + '/' + (version || 'v1') + item.path,
      item.router
    );
  });
};
