const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, checkAuthStatus } = require('../controllers/userController');

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route('/auth-status').get(checkAuthStatus);

module.exports = router;
