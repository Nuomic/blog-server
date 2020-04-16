const { Router } = require('express');
const multipleFields = require('./multipleFields');
const getResource = require('./getResource');
const saveResource = require('./saveResource');
const deleteResource = require('./deleteResource');

const router = Router();

module.exports = router;
router.get('/list', getResource);
router.post('/save', multipleFields, saveResource);
router.post('/delete', deleteResource);
