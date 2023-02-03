const express = require('express');
const router = express.Router();

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
// router.get('/', (req, res) => res.send('User Route'));

// @route:   GET api/auth
// @desc:    Register User
// @access:  Public
router.post('/', (req, res) => {
    console.log(req.body)
    res.send('User Added')
})

module.exports = router;
