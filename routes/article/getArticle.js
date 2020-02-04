const { resTemp, errTemp } = require('../config');
const { ArticleModel } = require('../../db');
module.exports = (req, res) => {
  /* 文章获取列表
   *1.默认查找全部
   *2.查找栏目获取 参数 categoryId
   *3.通过标签获取 参数 tagId
   * ***** */
  const { categoryId, tagId } = req.query;
  console.log('==========================', req.cookies);
  if (!!categoryId) {
  } else if (!!tagId) {
  } else {
    ArticleModel.aggregate(
      [
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
            date: 1,
            viewCount: 1,
            likeCount: 1,
            title: 1,
            content: 1,
            name: 1,
            categoryInfo: 1,
            avatar: 1,
            commentCount: { $size: '$comments' }
          }
        }
      ],
      (err, article) => {
        if (err) {
          res.json(errTemp(err, ''));
          return;
        }
        res.json(resTemp('articleList', article));
      }
    );
  }
};
