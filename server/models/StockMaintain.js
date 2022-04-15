const mongoose = require('mongoose');

const stockmaintainSchema = new mongoose.Schema({
purchase:{
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'purchase',
},purchase:{
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'sell',
},
})
const stockmaintainModel = mongoose.model('stockmaintain', sellSchema);
module.exports = stockmaintainModel;