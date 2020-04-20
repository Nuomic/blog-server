const { Router } = require('express');
const getPortfolio = require('./getPortfolio');
const savePortfolio = require('./savePortfolio');
const deletePortfolio = require('./deletePortfolio');
const router = Router();

module.exports = router;
router.get('/list', getPortfolio);
router.post('/save', savePortfolio);
router.post('/delete', deletePortfolio);
