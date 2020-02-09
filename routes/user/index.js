const { Router } = require('express');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const router = Router();
module.exports = router;

router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);
