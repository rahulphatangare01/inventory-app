const express = require('express');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const authuser = require('../middleware/auth');
const router = express.Router();


//  Rote no --> 1 Route for crete product
router.post('/createProduct', authuser,[
    body('name', 'Enter a valid product name').isLength({ min: 3 }),
    body('quantity', 'Enter at least 1 Quantity').isLength({ min: 1 }),
    body('price', 'Enter a product price').isLength({ min: 1 }),
    // body('companyName', 'Enter a company  Name').isLength({ min: 1 }),
    body('modelNo', 'Enter a Product ModelNo').isLength({ min: 1 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let product = await Product.findOne({ modelNo: req.body.modelNo });
      if (product) {
        return res.status(400).json({ error: "Sorry  this product already exists" })
      }
      // Create a new product
      product = await Product.create({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        // companyName:req.body.companyName,
        modelNo:req.body.modelNo,
      });
      // const data = {
      //   product: {
      //     id: product.id
      //   }
      // }
      // res.json(product)
      res.json({ product })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
//  Rote no --> 2 Route for GET product


  router.get('/getproduct', authuser,async (req,res)=>{
    try {
        const product = await Product.find();
        // const productCount = await Product.countDocuments()
        // res.status(200).json({
        //   success:true,
        //   product,
        //   productCount,
        //   })
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
});
//  Rote no --> 3 Route for Update product

// router.put('/updateproduct/:id',authuser,async (req,res)=>{
  // const { name,quantity,price,modelNo } = req.body;

//     try{
     // Create a newproduct object
    //  const newproduct = {};
    //  if (name) { newproduct.title = name };
    //  if (quantity) { newproduct.description = modelNo };
    //  if (price) { newproduct.tag = price };
    //  if (modelNo) { newproduct.tag = modelNo };

    //    const product = await Product.findById(req.params.id);
    //      if(product.productId === req.body.productId){
//         await post.updateOne({$set:req.body});
//         res.status(200).json('the Product has been updated')
//         }else{
//           res.status(403).json('you can update only your Product')  
//         }
//     }catch(err){
//         res.status(500).json(err);
//     }
   
// })




////////////////////////////////////////////////////////////////////

router.put('/updateproduct/:id',authuser , async (req, res) => {
  const { name,quantity,price,modelNo } = req.body;

  try {
      // Create a newproduct object
      const newproduct = {};
      if (name) { newproduct.name = name };
      if (quantity) { newproduct.quantity = quantity };
      if (price) { newproduct.price = price };
      if (modelNo) { newproduct.modelNo = modelNo };

      // Find the note to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) { return res.status(404).send("Not Found") }

      // if (product.product.() !== req.product.id) {
      //     return res.status(401).send("Not Allowed");
      // }
      product = await Product.findByIdAndUpdate(req.params.id, { $set: newproduct }, { new: true })
      res.json({ product });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

///////////////////////////////////////////////////////////////////////


//  Rote no --> 4 Route for Delete product


router.delete('/deleteproduct/:id',authuser,async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product.productId === req.body.productId){
        await product.deleteOne();
        res.status(200).json('the Product has been deleted')
        }else{
          res.status(403).json('you can delete only your Product')  
        }
    }catch(err){
        res.status(500).json(err);
    }
   
})
module.exports = router

