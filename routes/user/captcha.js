const { resTemp, errTemp, dataTemp } = require('../config');
module.exports = (req, res) => {
  var all = 'azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789';
  const captcha = [];
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * 62);
    captcha.push(all[index]);
  }
  res.json(resTemp({ captcha }));
};
