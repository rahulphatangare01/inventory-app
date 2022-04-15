const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  order: {
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

const purchaseModel = mongoose.model('purchase', purchaseSchema);
module.exports = purchaseModel;
