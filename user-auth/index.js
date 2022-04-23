const dotenv = require("dotenv");
dotenv.config();
require("./models/dbConnect.js");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/users");
const jwt = require('jsonwebtoken');
let PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", async (req, res) => {
  res.json({ status: "ok" });
  try {
    const user = new User(req.body);
    const final= await user.save()
    console.log('Final user', final);
  }catch (err) {
    console.log(err)
  };
})
app.post("/api/login", async (req, res) => {
  const retrieved_user = await User.findOne({
    newemail: req.body.email,
    newPass: req.body.password,
  });
  if (retrieved_user) {
    const token = jwt.sign({
      name: retrieved_user.name,
      email:retrieved_user.newemail
    },process.env.sectret_key)
    return res.json({ status: "ok", retrieved_user: token });
  } else {
    return res.json({ status: "error", retrieved_user: false });
  }
});
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
})
