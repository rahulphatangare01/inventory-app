const mongoose = require('mongoose');
const business_InfoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
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
    unique:true,
  },
});                                 //business
const businessModel = mongoose.model('Business', business_InfoSchema);
module.exports = businessModel;
