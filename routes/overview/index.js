const { Router } = require('express');
const pageView = require('./pageView');
const articleCount = require('./articleCount');

const router = Router();
module.exports = router;
router.get('/pageview', pageView);
router.get('/articlecount', articleCount);
