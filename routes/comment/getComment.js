const { resTemp, errTemp } = require('../config');
const { CommentModel } = require('../../db');
const { Types } = require('mongoose');
module.exports = (req, res) => {
  /* 评论分为 :
   *留言的评论 articleId 为null
   *文章的评论 articleId 不为null
   *前台返回处理之后的评论
   */
  const { articleId, all } = req.query;
  console.log('=============cookies=============', req.cookies);
  const commentList = CommentModel.aggregate()
    .sort({ _id: -1 })
    .project({
      id: '$_id',
      _id: 0,
      parentId: 1,
      articleId: 1,
      parentId: 1,
      isMine: 1,
      avatar: 1,
      dislikeCount: 1,
      likeCount: 1,
      content: 1,
      nickname: 1,
      email: 1,
      date: '$createdAt'
    });
  function translateDataToTree(data) {
    let parents = data.filter(value => value.parentId == null);
    let children = data.filter(value => value.parentId != null);
    let translator = (parents, children) => {
      parents.forEach(parent => {
        children.forEach((current, index) => {
          if (current.parentId.toString() === parent.id.toString()) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            //把找到子节点放入父节点的children属性中
            parent.children
              ? parent.children.push(current)
              : (parent.children = [current]);
          }
        });
      });
    };
    //调用转换方法
    translator(parents, children);
    //返回最终的结果
    return parents;
  }
  const callback = (err, commentList) => {
    total = commentList.length;
    commentList = translateDataToTree(commentList);
    if (err) {
      res.json(errTemp(err, ''));
      return;
    }
    res.json(resTemp({ total, commentList }));
  };
  if (!!articleId) {
    commentList.match({ articleId: Types.ObjectId(articleId) }).exec(callback);
  } else if (all) {
    commentList
      .lookup({
        from: 'articles',
        localField: 'articleId',
        foreignField: '_id',
        as: 'articleInfo'
      })
      .unwind({ path: '$articleInfo', preserveNullAndEmptyArrays: true })
      .project({
        id: 1,
        parentId: 1,
        articleInfo: {
          id: '$articleInfo._id',
          title: 1
        },
        nickname: 1,
        email: 1,
        date: 1,
        content: 1,
        avatar: 1,
        isMine: 1
      })
      .exec((err, commentList) => {
        if (err) {
          res.json(errTemp(err, ''));
          return;
        }
        res.json(resTemp({ commentList }));
      });
  } else {
    commentList.match({ articleId: null }).exec(callback);
  }
};
