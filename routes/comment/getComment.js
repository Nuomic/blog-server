const { resTemp } = require('../config');
const { CommentModel } = require('../../db');
module.exports = (req, res) => {
  /* 评论分为 :
   *留言的评论 articleId 为null
   *文章的评论 articleId 不为null
   *前台返回处理之后的评论
   */
  const { articleId } = req.query;
  console.log('==========================', req.cookies);
  if (!!categoryId) {
  } else {
    CategoryModel.aggregate([{}], (err, category) => {
      if (err) {
        res.json(
          //服务端解析成JSON后响应
          err
        );
        return;
      }
      res.json({
        //服务端解析成JSON后响应
        ...resTemp,
        categoryList: category
      });
    });
  }
};
