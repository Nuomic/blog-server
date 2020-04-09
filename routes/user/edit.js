const { UserModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const compare = (reqPassword, dbPassword) => {
    return require('bcryptjs').compareSync(reqPassword, dbPassword);
  };
  const dbPassword = UserModel.findById(userId, (err, userInfo) => {
    if (err) return res.json(errTemp(err, ''));
    if (userInfo) {
      return userInfo.password;
    }
  });
  // const getDbPassword = async () => {
  //   return await dbPassword;
  // };
  // console.log('object', getDbPassword());
  if (oldPassword) {
  }
};
