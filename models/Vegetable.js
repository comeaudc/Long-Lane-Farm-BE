const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VegetableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pricing: [
    {
      size: {
        type: Number,
      },
      unit: {
        type: String,
      },
      price: {
        type: Number,
      },
      qty: {
        type: Number,
      },
      isAvailable: {
        type: Boolean,
      },
    },
  ],
});

module.exports = Vegetable = mongoose.model('vegetable', VegetableSchema);
