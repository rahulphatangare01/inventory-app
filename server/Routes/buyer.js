const express = require("express");
const Buyer = require("../models/Buyer");
const { body, validationResult } = require("express-validator");
const authuser = require("../middleware/auth");
const router = express.Router();

//  Rote no --> 1 Route for crete BusinessInfo
router.post(
  "/createbuyer",
  authuser,
  [
    body("name", "Enter a valid  name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a 10 character ").isLength({ min: 10 }),
    body("companyName", "Enter a company Name ").isLength({ min: 3 }),
    body("productName", "Enter a valid product").isLength({ min: 3 }),
    body("stock", "Enter a valid quantity ").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Create a new product
      let buyer = await Buyer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        companyName: req.body.companyName,
        productName: req.body.productName,
        stock: req.body.stock,
        
      });
     buyer.save()
      // res.json(buyer)
      res.json({ buyer });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//  Rote no --> 2  Route for GET BusinessInfo

router.get("/getbuyer/:id", authuser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    res.status(200).json(buyer);
  } catch (err) {
    res.status(500).json(err);
  }
});
//  Rote no --> 3 Route for Update product

router.put("/updatebuyer/:id", authuser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (buyer.buyerId === req.body.buyerId) {
      await buyer.updateOne({ $set: req.body });
      res.status(200).json("the buyer Info has been updated");
    } else {
      res.status(403).json("you can update only your  Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Rote no --> 4 Route for Delete product

router.delete("/deletebuyer/:id", authuser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (buyer.buyerId === req.body.buyerId) {
      await buyer.deleteOne();
      res.status(200).json("the business Info has been deleted");
    } else {
      res.status(403).json("you can delete only your business Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
