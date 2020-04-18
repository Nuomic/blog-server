const { dataTemp } = require('../config');
const { PageModel } = require('../../db');
module.exports = async () => {
  const page = await PageModel.find().sort({ _id: -1 });
  const pageList = dataTemp(page);
  const pvTotal = pageList.reduce(
    (pre, curr) =>
      (pre += curr.pageInfo.reduce((pre, curr) => (pre += curr.pv), 0)),
    0
  );

  return { pageList: pageList.slice(0, 90), pvTotal };
};
