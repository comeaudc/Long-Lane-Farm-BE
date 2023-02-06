const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Vegetable = require('../../models/Vegetable');

// @route:   GET api/products
// @desc:    Test Route
// @access: Public
// router.get('/', adminAuth, async (req, res) => {
//   try {
//     res.send('Admin Access Granted');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route:  POST api/vegetables
// @desc:   Create a Vegetable
// @access: Private
router.post(
  '/',
  [adminAuth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, pricing } = req.body;

    try {
      let vegetable = await Vegetable.findOne({ name });

      if(vegetable) {
        return res.status(400).json( { errors: [ { msg: 'Vegetable already exists'}]})
      }

      const newVegetable = new Vegetable({
        name,
        pricing
      });

      vegetable = await newVegetable.save();

      res.json(vegetable);
    } catch (err) {
      console.error(err.message), res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
