const { resTemp } = require('../config');
const { CategoryModel } = require('../../db');
module.exports = (req, res) => {
  const { categoryId } = req.query;
  console.log('==========================', req.cookies);
  if (!!categoryId) {
  } else {
    CategoryModel.aggregate(
      [
        {
          $lookup: {
            from: 'articles',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'article'
          }
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: 1,
            avatar: 1,
            date: '$createdAt'
          }
        }
      ],
      (err, category) => {
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
      }
    );
  }
};
