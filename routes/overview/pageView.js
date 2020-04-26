const { dataTemp } = require('../config');
const { PageModel } = require('../../db');
const moment = require('moment');
module.exports = async () => {
  const page = await PageModel.find().sort({ _id: -1 });
  const today = moment().format('YYYY-MM-DD');
  const pageList = dataTemp(page);
  const todayPv = pageList.find((item) => item.date == today) || {};
  const todayPvTotal =
    todayPv.pageInfo &&
    todayPv.pageInfo.reduce((pre, curr) => (pre += curr.pv), 0);
  console.log('todayPv', todayPv);
  const pvTotal = pageList.reduce(
    (pre, curr) =>
      (pre += curr.pageInfo.reduce((pre, curr) => (pre += curr.pv), 0)),
    0
  );

  return { pageList: pageList.slice(0, 90), pvTotal, todayPvTotal };
};
