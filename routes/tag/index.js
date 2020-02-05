const { Router } = require('express');
const getTag = require('./getTag');
const saveTag = require('./saveTag');
const deleteTag = require('./deleteTag');
const router = Router();
module.exports = router;
router.get('/list', getTag);
router.post('/save', saveTag);
router.post('/delete', deleteTag);
