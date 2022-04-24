const express = require("express");
const Supplier = require("../models/Supplier");
const { body, validationResult } = require("express-validator");
const authuser = require("../middleware/auth");
const router = express.Router();

//  Rote no --> 1 Route for crete BusinessInfo
router.post(
  "/createsupplier",
  authuser,
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
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Create a new product
      let supplier = await Supplier({
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
      supplier.save();
      // res.json(product)
      res.json({ supplier });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//  Rote no --> 2  Route for GET BusinessInfo


router.get("/getsupplier", authuser, async (req, res) => {
  try {
    const supplier = await Supplier.find({ user: req.user.id });
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server Error");
  }
});
//  Rote no --> 3 Route for Update product

router.put('/updatesupplier/:id',authuser , async (req, res) => {
  const { companyName,phone,ownerName,email,address,country,state,zip,pan } = req.body;

  try {
      // Create a new supplier  object
      const newsupplier = {};
      if (companyName) { newsupplier.companyName = companyName };
      if (phone) { newsupplier.phone = phone };
      if (ownerName) { newsupplier.ownerName = ownerName };
      if (email) { newsupplier.email = email };
      if (address) { newsupplier.address = address };
      if (country) { newsupplier.country = country };
      if (state) { newsupplier.state = state };
      if (zip) { newsupplier.zip = zip };
      if (pan) { newsupplier.pan = pan };


      // Find the note to be updated and update it
      let supplier = await Supplier.findById(req.params.id);
      if (!supplier) { return res.status(404).send("Not Found") }
      supplier = await Supplier.findByIdAndUpdate(req.params.id, { $set: newsupplier }, { new: true })
      res.json({ supplier });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

//  Rote no --> 4 Route for Delete product

router.delete("/deletesupplier/:id", authuser, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier.supplierId === req.body.supplierId) {
      await supplier.deleteOne();
      res.status(200).json("the supplier Info has been deleted");
    } else {
      res.status(403).json("you can delete only your supplier Info");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
