const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CSASchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  frequency: {
    type: String,
  },
  description: {
    type: String,
  },
  isAvail: {
    type: Boolean,
  },
});

module.exports = CSA = mongoose.model('csa', CSASchema);
