require('dotenv').config()
const express=require('express');
const mongoose = require('mongoose');
const app = express()
const connection = require('./db');
connection()

// const  auth= require('./route/auth')
const port= process.env.PORT || 5000

const  user= require('./Routes/user')
const  product= require('./Routes/product')


// Database Connection ( Mongodb Atlas)

//  mongoose.connect("mongodb+srv://admin:n4TCEyQE6rNykSEP@cluster0.5npci.mongodb.net/user?retryWrites=true&w=majority").then(data=>{console.log(' Database connection Success');
//  }).catch(err =>{
//      console.log(err);
//  })


// middleware
app.use(express.json())  // json file getting

// Routes 
app.use("/auth", require("./Routes/user"))
app.use("/product", require("./Routes/product"))












// server
app.listen(port,()=>{
    console.log(`server Running at Port ${port}`)
})