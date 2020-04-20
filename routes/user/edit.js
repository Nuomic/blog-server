const { UserModel } = require('../../db');
const { resTemp, errTemp, dataTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { userId, oldPassword, newPassword, ...info } = req.body;
  const changeUserInfo = (value) => {
    UserModel.findByIdAndUpdate(
      userId,
      value,
      { new: true },
      (err, userInfo) => {
        if (err) return res.json(errTemp(err, '数据库错误'));
        if (userInfo) {
          userInfo = dataTemp(userInfo);
          delete userInfo.password;
          delete userInfo.updatedAt;
          res.json(resTemp({ msg: '修改成功！', userInfo }));
        } else {
          res.json(errTemp(err, '修改密败，请稍后再试！'));
        }
      }
    );
  };
  UserModel.findById(userId, (err, userInfo) => {
    if (err) return res.json(errTemp(err, '数据库错误'));
    if (userInfo) {
      //修改密码
      if (newPassword) {
        const isPasswordValid = require('bcryptjs').compareSync(
          oldPassword,
          userInfo.password
        );
        //对比旧密码
        if (isPasswordValid) changeUserInfo({ password: newPassword });
        else res.json(errTemp(err, '原密码错误，修改失败'));
      } else {
        UserModel.findOne({ username: info.username }, (err, userInfo) => {
          console.log('userInfo', userInfo);
          if (err) return res.json(errTemp(err, ''));
          if (userInfo) {
            res.json(errTemp(err, '修改失败，改用户存在!'));
          } else {
            changeUserInfo(info);
          }
        });
      }
    } else {
      res.json(errTemp(err, '用户不存在'));
    }
  });
};
