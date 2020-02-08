const { resTemp, errTemp, dataTemp } = require('../config');
const { ArticleModel, TagModel } = require('../../db');
const { Types } = require('mongoose');
module.exports = async (req, res) => {
  /* 前台文章详情页
   *1.栏目名称
   *2.查找栏目获取 参数 categoryId
   *3.通过标签获取 参数 tagId
   * ***** */
  const { articleId } = req.query;
  console.log('=====articleId==article=======', articleId);
  console.log('=============cookies=============', req.cookies);
  const Article = ArticleModel.aggregate()
    .lookup({
      from: 'categories',
      localField: 'categoryId',
      foreignField: '_id',
      as: 'categoryInfo'
    })
    .unwind('$categoryInfo')
    .match({ status: '1' })
    .project({
      id: '$_id',
      _id: 0,
      viewCount: 1,
      likeCount: 1,
      title: 1,
      content: 1,
      categoryInfo: {
        id: '$categoryInfo._id',
        name: '$categoryInfo.name'
        // avatar: '$categoryInfo.avatar'
      },
      createdAt: 1,
      avatar: 1,
      tags: 1
    });

  const callback = async (err, article) => {
    let current = await Article.match({
      id: Types.ObjectId(articleId)
    }).exec();
    console.log('current', current[0]);
    current = current[0];
    if (err || !current) {
      res.json(errTemp(err, ''));
      return;
    } else {
      const index = article.findIndex(item => {
        return item.id.toString() == current.id.toString();
      });
      if (index != 0) {
        current.pre = {
          id: article[index - 1].id,
          title: article[index - 1].title
        };
      }
      if (index != article.length - 1) {
        current.next = {
          id: article[index + 1].id,
          title: article[index + 1].title
        };
      }
      TagModel.find({ name: { $in: current.tags } }, (err, tag) => {
        current.tagList = dataTemp(tag);
        delete current.tags;
        res.json(resTemp('articleDetail', current));
      });
    }
  };
  Article.exec(callback);
};
