const { resTemp, errTemp } = require('../config');
const { CategoryModel } = require('../../db');
module.exports = (req, res) => {
  const { categoryId } = req.query;
  console.log('============cookies==============', req.cookies);
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
        { $match: { name: { $ne: '草稿' } } },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: 1,
            avatar: 1,
            articleCount: { $size: '$article' }
          }
        },
        { $sort: { id: -1 } }
      ],
      (err, articleList) => {
        if (err) {
          res.json(errTemp(err, ''));
          return;
        }
        res.json(resTemp({ articleList }));
      }
    );
  }
};
