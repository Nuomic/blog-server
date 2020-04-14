const { CategoryModel } = require('../../db');
module.exports = async () => {
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
  const articleTotal = categoryList.reduce(
    (pre, curr) => (pre += curr.count),
    0
  );
  return { categoryList, articleTotal };
};
