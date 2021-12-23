const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../model/Users");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "tokenfromsantosh$";

const { body, validationResult } = require("express-validator");

// ROUTE 1
//REGISTERING :POST---> "/API/AUTH/"
router.post(
  "/register",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const New_user = new User({
      name,
      email,
      password: hashed,
    });

    try {
      const savedUser = await New_user.save();
      const data = {
        user: {
          id: savedUser._id,
        },
      };
      const authToken = JWT.sign(data, JWT_SECRET);
      res.status(200).json({ success: true, message: authToken });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Sever Error", err });
    }
  }
);
// ROUTE 2
// LOGIN -->POST METHOD / API/AUTH/

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password Should Not Be blank").exists(),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const isUser = await User.findOne({ email });
      if (!isUser) {
        return res.status(401).json({
          success: false,
          error: "Please try to login with the correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, isUser.password);
      if (!passwordCompare) {
        return res.status(401).json({
          success: false,
          error: "Please try to login with the correct credentials",
        });
      }

      const data = {
        user: {
          id: isUser._id,
        },
      };
      const authToken = JWT.sign(data, JWT_SECRET);
      res.status(200).json({ success: true, message: authToken });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error", err });
    }
  }
);

// ROUTE 3 get logged in User details usin :POST/"api/auth/getuser".Login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const {_doc} = await User.findById({ _id: userId });
    const { password, ...other } = _doc;
    res.send(other);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", err });
  }
});

// DELETING THE USER

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });

    if (user) {
      const fetchedUser = await User.findByIdAndDelete({ _id: id });

      res
        .status(200)
        .json({ success: true, message: "userDeleted Successfuly" });
    } else {
      res.status(401).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
module.exports = router;
