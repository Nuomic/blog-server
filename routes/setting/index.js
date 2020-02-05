const { Router } = require('express');
const getSetting = require('./getSetting');
const saveSetting = require('./saveSetting');
const getSiderData = require('./getSiderData');
const router = Router();
module.exports = router;
router.get('/get/:type', getSetting);
router.post('/save', saveSetting);
router.get('/sider', getSiderData);
