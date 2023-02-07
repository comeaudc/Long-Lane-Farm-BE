const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const CSA = require('../../models/CSA');

// @route:  POST api/csas
// @desc:   Create a csa
// @access: Private
router.post(
  '/',
  [adminAuth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, frequency, description, isAvail } = req.body;


    try {
      let csa = await CSA.findOne({ name });

      if (csa) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'CSA already exists' }] });
      }

      const newCSA = new CSA({
        name,
        price,
        frequency,
        description,
        isAvail,
      });

      csa = await newCSA.save();

      res.json(csa);
    } catch (err) {
      console.error(err.message), res.status(500).send('Server Error');
    }
  }
);

// @route:  DELETE api/csas
// @desc:   Delete a csa
// @access: Private
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const csa = await CSA.findById(req.params.id);

    if (!csa) {
      return res.status(401).json({ msg: 'CSA not found' });
    }

    await csa.remove();

    res.json({ msg: 'CSA removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'CSA not found' });
    }
  }
});

module.exports = router;
