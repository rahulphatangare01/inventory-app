const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
