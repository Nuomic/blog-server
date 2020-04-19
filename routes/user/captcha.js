const { resTemp, errTemp, dataTemp } = require('../config');
const { UserModel } = require('../../db');
const commCount = require('../overview/commCount');
module.exports = async (req, res) => {
  const userCount = await commCount('User');
  console.log('userCount', userCount);
  if (userCount) {
    var all = 'azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789';
    const captcha = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * 62);
      captcha.push(all[index]);
    }
    res.json(resTemp({ captcha }));
  } else {
    const userInfo = {
      username: 'admin',
      password: '21232f297a57a5a743894a0e4a801fc3', //admin
    };
    UserModel.create(userInfo, (err, userInfo) => {
      console.log('err', err);
      if (err) return res.json(errTemp(err, '', '401'));
      return res.json(errTemp(err, '登录失效，请重新登录', '401', 'fail'));
    });
  }
};
