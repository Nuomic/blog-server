const { resTemp, errTemp, dataTemp } = require('../config');
const { ArticleModel } = require('../../db');
module.exports = (req, res) => {
  /* 文章获取列表
   *1.默认查找全部
   *2.查找栏目获取 参数 categoryId
   *3.通过标签获取 参数 tagId
   * ***** */
  const { categoryId, tagId, status, articleId } = req.query;
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
    article.map(item => {
      item.content = item.content
        .replace(/(\*\*|__)(.*?)(\*\*|__)/g, '') //全局匹配内粗体
        .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, '') //全局匹配图片
        .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g, '') //全局匹配连接
        .replace(/<\/?.+?\/?>/g, '') //全局匹配内html标签
        .replace(/(\*)(.*?)(\*)/g, '') //全局匹配内联代码块
        .replace(/`{1,2}[^`](.*?)`{1,2}/g, '') //全局匹配内联代码块
        .replace(/```([\s\S]*?)```[\s]*/g, '') //全局匹配代码块
        .replace(/\~\~(.*?)\~\~/g, '') //全局匹配删除线
        .replace(/[\s]*[-\*\+]+(.*)/g, '') //全局匹配无序列表
        .replace(/[\s]*[0-9]+\.(.*)/g, '') //全局匹配有序列表
        .replace(/(#+)/g, '') //全局匹配标题
        .replace(/(>+)/g, '') //全局匹配摘要
        .replace(/\r\n/g, '') //全局匹配换行
        .replace(/\n/g, '') //全局匹配换行
        .replace(/\s/g, '')
        .slice(0, 150);
      return item._doc;
    });
    res.json(resTemp({ articleList: article }));
  };
  if (articleId) {
    ArticleModel.findById(articleId, {
      updatedAt: 0,
      createdAt: 0,
      viewCount: 0,
      likeCount: 0
    }).exec((err, article) => {
      if (err) {
        res.json(errTemp(err, ''));
        return;
      }
      res.json(resTemp('article', dataTemp(article)));
    });
  } else if (!!categoryId) {
  } else if (!!tagId) {
  } else {
    if (status) article.match({ status }).exec(callback);
    else article.exec(callback);
  }
};
