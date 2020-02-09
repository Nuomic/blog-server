const { UserModel } = require('../../db');
const { resTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { username, password, userid } = req.body;
  console.log('req.cookies', req.cookies);
};
