const { Router } = require('express');
const pageView = require('./pageView');
const router = Router();
module.exports = router;
router.get('/pageview', pageView);
