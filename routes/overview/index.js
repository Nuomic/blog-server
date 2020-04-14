const { Router } = require('express');
const pageView = require('./pageView');
const articleCount = require('./articleCount');
const commCount = require('./commCount');
const { resTemp, errTemp, dataTemp } = require('../config');
const router = Router();
module.exports = router;

router.get('/', async (req, res) => {
  const category = await articleCount();
  const commentTotal = await commCount('Comment');
  const friendTotal = await commCount('Friend');
  const tagTotal = await commCount('Tag');
  const categoryTotal = await commCount('Category');
  const page = await pageView();
  res.json(
    resTemp({
      ...category,
      ...page,
      commentTotal,
      friendTotal,
      tagTotal,
      categoryTotal,
    })
  );
});
