const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    newusername: { type: String, required: true },
    newuserEmail: { type: String, required: true, unique: true },
    newPass: { type: String, required: true },
  }
  // {collection : 'register_users'}
);
const model = mongoose.model("register_user", User);
module.exports = model;
