const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
});

const supplierModel = mongoose.model('supplier', supplierSchema);
module.exports = supplierModel;
