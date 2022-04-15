const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'supplier',
  },
});
const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
