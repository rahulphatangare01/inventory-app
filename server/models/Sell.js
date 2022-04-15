const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'buyer',
  },
});

const sellModel = mongoose.model('sell', sellSchema);
module.exports = sellModel;
