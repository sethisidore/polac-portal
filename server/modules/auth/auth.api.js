const express = require('express');
const passport = require('passport');
const AuthController = require('./auth.ctrl');

const router = express.Router();

router.post('/login', AuthController.login);

router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect: '/signup',
}));

router.get('/status', AuthController.getStatus);

router.get('/logout', AuthController.logout);

router.delete('/remove-account', AuthController.removeAccount)

module.exports = router;
