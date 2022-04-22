const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema ({
  Ownername:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  companyName:{
    type:String,
    required:true,
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
  // productName:{
  //   type:String,
  //   required:true,
  // },
  // stock:{
  //   type:Number,
  //   required:true,
  // }
})

const buyerModel = mongoose.model('buyer',buyerSchema)
module.exports=buyerModel
