const mongoose = require("mongoose");

const userSchema = {
  name: {
    type: String,
    required: true,
    unique:true

  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },createdAt:{
      type:Date,
      default:Date.now
  }
};
const User =mongoose.model("user",userSchema);
User.createIndexes();
module.exports =User
