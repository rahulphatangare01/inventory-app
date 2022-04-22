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
    body("Ownername", "Enter a valid  Ownername").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a 10 character ").isLength({ min: 10 }),
    body("companyName", "Enter a company Name ").isLength({ min: 3 }),
    body("address", "Enter a valid Address ").isLength({ min: 3 }),
    body("country", "Enter a country Name ").isLength({ min: 3 }),
    body("state", "Enter a State ").isLength({ min: 3 }),
    body("zip", "Enter a Zip code ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let  buyer = await Buyer.findOne({ 
        email: req.body.email
      
     });
     if (buyer) {
       return res.status(400).json({ error: "This buyer is allready register with this  Email " })
     }
      // Create a new product
       buyer = await Buyer({
        Ownername: req.body.Ownername,
        email: req.body.email,
        phone: req.body.phone,
        companyName: req.body.companyName,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
    
        
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

// router.get("/getbuyer/:id", authuser, async (req, res) => {
//   try {
//     const buyer = await Buyer.findById(req.params.id);
//     res.status(200).json(buyer);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });

router.get("/getbuyer", authuser, async (req, res) => {
  try {
    const buyer = await Buyer.find();
    res.json(buyer);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server Error");
  }
});
//  Rote no --> 3 Route for Update product

router.put("/updatebuyer/:id", authuser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (buyer.buyerId === req.body.buyerId) {
      await buyer.updateOne({ $set: req.body });
      res.status(200).json(buyer);
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
      res.status(200).json(buyer);
    } else {
      res.status(401).json("you can delete only your business Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
