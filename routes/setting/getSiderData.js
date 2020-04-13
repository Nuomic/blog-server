const {
  CategoryModel,
  ArticleModel,
  FriendModel,
  TagModel,
  PageModel,
} = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = async (req, res) => {
  const { pageName } = req.query;
  console.log('pageName', pageName);
  //通过侧边栏记录页面pv
  PageModel.findOneAndUpdate(
    { pageName },
    {
      $inc: { pv: 1 },
    },
    (err, page) => {
      if (err) return;
      if (!page) {
        PageModel.create({ pageName }, (err, page) => {
          console.log('page', page);
          if (err) return;
        });
      }
    }
  );
  const category = await CategoryModel.aggregate()
    .lookup({
      from: 'articles',
      localField: '_id',
      foreignField: 'categoryId',
      as: 'article',
    })
    .sort({ _id: -1 })
    .match({ name: { $ne: '未分类草稿' } })
    .project({
      id: '$_id',
      _id: 0,
      name: 1,
      article: 1,
    });

  const categoryList = category.map((item) => {
    !!item.article.length &&
      (item.article = item.article.filter((item) => item.status == '1'));
    item.articleCount = item.article.length;
    delete item.article;
    return item;
  });
  const tagList = await TagModel.aggregate().project({
    _id: 0,
    id: '$_id',
    name: 1,
    color: 1,
  });
  const links = await FriendModel.aggregate().match({ status: '0' }).project({
    _id: 0,
    id: '$_id',
    siteName: 1,
    siteUrl: 1,
  });
  const hotList = await ArticleModel.aggregate()
    .match({ status: '1' })
    .sort({ viewCount: -1 })
    .limit(5)
    .project({
      id: '$_id',
      _id: 0,
      title: 1,
    });
  const latestList = await ArticleModel.aggregate()
    .match({ status: '1' })
    .sort({ _id: -1 })
    .limit(5)
    .project({
      id: '$_id',
      _id: 0,
      title: 1,
      createdAt: 1,
    });
  res.json(
    resTemp({
      siderData: { categoryList, tagList, links, hotList, latestList },
    })
  );
};
