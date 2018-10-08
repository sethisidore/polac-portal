const passport = require('passport');
const jwt = require('jsonwebtoken');

const { Cadet, Staff, User } = require('../users');

/**
 * @method login
 * @memberof AuthController
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      res.status(404).json(err);
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }
    if (user) {
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          res.status(500).json(err);
          return next(err);
        }
        const token = jwt.sign(user, process.env.PASSPORT_JWT_SECRET);
        res.status(200).json({ user, token });      
      })
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getStatus = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false,
    });
  }
  return res.status(200).json({
    status: true,
  });
}

/**
 * @method register
 * @param {request} req 
 * @param {response} res 
 */
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

/**
 * @method {register}
 * @memberof {AuthController}
 * @param {request} 
 * @param {resource}
 * @returns {[Promise, Error]}
 */
const register = async (req, res) => {
  let bio_id;
  const { username, password, _type, profile } = req.body;

  if(_type === 'cadet') {
    const data = new Cadet(profile);
    await data.save();
    bio_id = data.cadet_id;
  }
  if (_type === 'staff') {
    const data = new Staff(profile);
    await data.save();
    bio_id = data.staff_id;
  }
  // Create User
  const user = new User({ username, _type, bio_id });
  await user.setPassword(password);
  await user.save();
  const { savedUser } = User.authenticate()(username, password);
  if (savedUser) {
    req.logIn(savedUser, { session: false }, (err) => {
      if (err) {
        res.status(500).json(err);
      }
      const token = jwt.sign(savedUser, process.env.PASSPORT_JWT_SECRET);
      res.status(200).json({ savedUser, token });
    });
  }
}

module.exports = {
  getStatus,
  login,
  logout,
  register,
};
