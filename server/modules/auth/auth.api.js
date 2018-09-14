const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user',
        });
      }
      return res.status(200).json({
        status: 'Login successful!',
      });
    });
  })(req, res, next);
});

router.get('/status', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false,
    });
  }
  return res.status(200).json({
    status: true,
  });
});

module.exports = router;
