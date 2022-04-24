const express = require("express");
const Business = require("../models/BusinessInfo");
const { body, validationResult } = require("express-validator");
const authuser = require("../middleware/auth");
const router = express.Router();

//  Rote no --> 1 Route for crete BusinessInfo
router.post(
  "/createbusinessInfo",
  
  [
    body("companyName", "Enter a valid company name").isLength({ min: 3 }),
    body("phone", "Enter a 10 character ").isLength({ min: 10 }),
    body("ownerName", "Enter a owner Name ").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("address", "Enter a valid Address ").isLength({ min: 3 }),
    body("country", "Enter a country Name ").isLength({ min: 3 }),
    body("state", "Enter a State ").isLength({ min: 3 }),
    body("zip", "Enter a Zip code ").isLength({ min: 5 }),
    body("pan", "Enter a PAN Number ").isLength({ min: 3 }),
  ],authuser,
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let  business = await Business.findOne({ 
         email: req.body.email,
        pan:req.body.pan
      });
      if (business) {
        return res.status(400).json({ error: "This business is allready register with this mail and pan" })
      }

      // Create a new Business Info
      
       business = await Business({
        companyName: req.body.companyName,
        phone: req.body.phone,
        ownerName: req.body.ownerName,
        email: req.body.email,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
        pan: req.body.pan,
      });
      business.save();
      // res.json(product)
      res.json({ business });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//  Rote no --> 2  Route for GET BusinessInfo


router.get("/getbusniess", authuser, async (req, res) => {
  try {
    const business = await Business.find()
    res.json(business);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server Error");
  }
});
//  Rote no --> 3 Route for Update product

// router.put("/updatebusiness/:id", authuser, async (req, res) => {
//   try {
//     const business = await Business.findById(req.params.id);
//     if (business.businessId === req.body.businessId) {
//       await business.updateOne({ $set: req.body });
      
//       res.status(200).json("the Business Info has been updated");
//     } else {
//       res.status(403).json("you can update only your Buiness Info");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.put("/updatebusiness/:id",authuser , async (req, res) => {
  const { companyName,phone,ownerName,email,address,country,state,zip,pan } = req.body;

  try {
      // Create a new Bussiness  object
      const newbusiness = {};
      if (companyName) { newbusiness.companyName = companyName };
      if (phone) { newbusiness.phone = phone };
      if (ownerName) { newbusiness.ownerName = ownerName };
      if (email) { newbusiness.email = email };
      if (address) { newbusiness.address = address };
      if (country) { newbusiness.country = country };
      if (state) { newbusiness.state = state };
      if (zip) { newbusiness.zip = zip };
      if (pan) { newbusiness.pan = pan };


      // Find the note to be updated and update it
      let business = await Business.findById(req.params.id);
      if (!business) { return res.status(404).send("Not Found") }
      business = await Business.findByIdAndUpdate(req.params.id, { $set: newbusiness }, { new: true })
      res.json({ business });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})



//  Rote no --> 4 Route for Delete product

router.delete("/deletebusiness/:id", authuser, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business.businessId === req.body.businessId) {
      await business.deleteOne();
      res.status(200).json("the business Info has been deleted");
    } else {
      res.status(403).json("you can delete only your business Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
