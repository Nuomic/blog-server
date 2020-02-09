const { Router } = require('express');
const getCategory = require('./getCategory');
const saveCategory = require('./saveCategory');
const deleteCategory = require('./deleteCategory');
const router = Router();
module.exports = router;
router.get('/list', getCategory);
router.post('/save', saveCategory);
router.post('/delete', deleteCategory);
