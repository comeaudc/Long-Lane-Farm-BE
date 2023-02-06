const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const auth = require('../../middleware/auth');

const User = require('../../models/user');

// @route:   GET api/products
// @desc:    Test Route
// @access: Public
router.get('/', adminAuth, async (req, res) => {
  try {
    res.send('Admin Access Granted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
