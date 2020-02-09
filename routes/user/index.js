const { Router } = require('express');
const login = require('./login');
const logout = require('./logout');
const registered = require('./registered');
const router = Router();
module.exports = router;
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', registered);
