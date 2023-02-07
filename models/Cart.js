const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  CSAs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'csa',
    },
  ],
  veggies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vegetable',
    },
  ],
});

module.exports = Cart = mongoose.model('cart', CartSchema);
