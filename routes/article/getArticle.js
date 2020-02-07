const { resTemp, errTemp, dataTemp } = require('../config');
const { ArticleModel } = require('../../db');
module.exports = (req, res) => {
  /* 文章获取列表
   *1.默认查找全部
   *2.查找栏目获取 参数 categoryId
   *3.通过标签获取 参数 tagId
   * ***** */
  const { categoryId, tagId, status } = req.query;
  console.log('==========================', req.cookies);
  const article = ArticleModel.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'articleId',
        as: 'comments'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryInfo'
      }
    },
    { $unwind: '$categoryInfo' },
    {
      $project: {
        id: '$_id',
        _id: 0,
        viewCount: 1,
        likeCount: 1,
        title: 1,
        content: 1,
        name: 1,
        categoryInfo: {
          id: '$categoryInfo._id',
          name: '$categoryInfo.name',
          avatar: '$categoryInfo.avatar'
        },
        status: 1,
        createdAt: 1,
        avatar: 1,
        commentCount: { $size: '$comments' }
      }
    },
    { $sort: { id: -1 } }
  ]);
  const callback = (err, article) => {
    console.log('article', article);
    if (err) {
      res.json(errTemp(err, ''));
      return;
    }
    res.json(resTemp('articleList', article));
  };
  if (!!categoryId) {
  } else if (!!tagId) {
  } else {
    if (status) article.match({ status }).exec(callback);
    else article.exec(callback);
  }
};
