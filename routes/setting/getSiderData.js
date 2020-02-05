const {
  CategoryModel,
  ArticleModel,
  FriendModel,
  TagModel
} = require('../../db');
const { resTemp, errTemp } = require('../config');
module.exports = async (req, res) => {
  const categoryList = await CategoryModel.aggregate()
    .lookup({
      from: 'articles',
      localField: '_id',
      foreignField: 'categoryId',
      as: 'article'
    })
    .project({
      id: '$_id',
      _id: 0,
      name: 1,
      articleCount: { $size: '$article' }
    })
    .sort({ articleCount: -1 });
  const tagList = await TagModel.aggregate().project({
    _id: 0,
    id: '$_id',
    name: 1,
    color: 1
  });
  const links = await FriendModel.aggregate()
    .match({ status: '0' })
    .project({
      _id: 0,
      id: '$_id',
      siteName: 1,
      siteUrl: 1
    });
  const hotList = await ArticleModel.aggregate()
    .match({ status: '1' })
    .sort({ viewCount: -1 })
    .limit(5)
    .project({
      id: '$_id',
      _id: 0,
      title: 1
    });
  const latestList = await ArticleModel.aggregate()
    .match({ status: '1' })
    .sort({ _id: -1 })
    .limit(5)
    .project({
      id: '$_id',
      _id: 0,
      title: 1,
      createdAt: 1
    });
  res.json(
    resTemp('siderData', { categoryList, tagList, links, hotList, latestList })
  );
};
