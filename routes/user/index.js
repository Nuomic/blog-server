const { Router } = require('express');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const check = require('./checkLogin');
const edit = require('./edit');
const router = Router();
module.exports = router;

router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);
router.post('/edit', edit);
router.get('/check', check);
