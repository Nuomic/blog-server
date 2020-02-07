const { CategoryModel, TagModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = async (req, res) => {
  let { type } = req.query;
  console.log('type', type);
  type = type.split(',');
  if (type.includes('1'))
    var categoryList = await CategoryModel.aggregate()
      .project({
        key: '$_id',
        _id: 0,
        name: 1
      })
      .match({ name: { $ne: '草稿' } });
  console.log('categoryList', categoryList);
  if (type.includes('2'))
    var tagList = await TagModel.aggregate().project({
      key: '$_id',
      _id: 0,
      name: 1
    });
  console.log('tagList', tagList);
  res.json(resTemp('formData', { categoryList, tagList }));
};
