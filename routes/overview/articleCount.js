const { resTemp, errTemp, dataTemp } = require('../config');
const { ArticleModel, CategoryModel } = require('../../db');
module.exports = async (req, res) => {
  const category = await CategoryModel.aggregate()
    .lookup({
      from: 'articles',
      localField: '_id',
      foreignField: 'categoryId',
      as: 'article',
    })
    .project({
      id: '$_id',
      _id: 0,
      name: 1,
      article: 1,
    });

  const categoryList = category.map((item) => {
    item.count = item.article.length;
    delete item.article;
    return item;
  });
  console.log('categoryList', categoryList);
  res.json(resTemp({ categoryList }));
};
