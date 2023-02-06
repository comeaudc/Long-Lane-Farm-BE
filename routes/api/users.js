const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/user');

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
// router.get('/', (req, res) => res.send('User Route'));

// @route:   GET api/auth
// @desc:    Register User
// @access:  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already Exists' }] });
      }

      //New instance of user
      user = new User({
        name,
        email,
        password,
      });

      //Encrypt PW. First create salt
      const salt = await bcrypt.genSalt(10);
      // Then encrpyt pw with salt
      user.password = await bcrypt.hash(password, salt);

      //Save User to DB
      await user.save();

      //Return json Webtoken
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {}
  }
);

module.exports = router;
