const express=require('express');
const mongoose = require('mongoose');
const app = express()
// const  auth= require('./route/auth')
const port= process.env.PORT || 1010

const  user= require('./Routes/user')

// Database Connection ( Mongodb Atlas)

 mongoose.connect("mongodb+srv://admin:n4TCEyQE6rNykSEP@cluster0.5npci.mongodb.net/user?retryWrites=true&w=majority").then(data=>{console.log(' Database connection Success');
 }).catch(err =>{
     console.log(err);
 })


// middleware
app.use(express.json())  // json file getting

// Routes 
app.use("", require("./Routes/user"))











// server
app.listen(port,()=>{
    console.log(`server Running at Port ${port}`)
})