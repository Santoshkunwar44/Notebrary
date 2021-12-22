const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../model/Users");
const JWT_SECRET = "tokenfromsantosh$";
const { body, validationResult } = require("express-validator");
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
        .json({ success: false, message: "Enter a valid Credentials ", err });
    }
  }
);

// LOGIN -->POST METHOD / API/AUTH/
router.post("/login", [body("email").isEmail()], async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  try {
    const isUser = await User.findOne({ name: name });
    if (isUser) {
      const validate = await bcrypt.compare(password, isUser.password);
      if (validate) {
        const { password, ...others } = isUser._doc;
        return res.status(200).json(others);
      } else {
        return res.status(400).json({ errorMsg: " password is invalid" });
      }
    } else {
      return res.status(400).json({ errorMsg: " User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ errorMsg: "Username or password  is invalid" });
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
