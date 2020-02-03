const { Router } = require('express');
const aaa = require('./aaa');
const router = Router();
module.exports = router;
router.get('/list', (req, res) => aaa(req, res));
