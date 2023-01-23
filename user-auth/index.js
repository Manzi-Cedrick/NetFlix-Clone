const dotenv = require("dotenv");
dotenv.config();
require("./models/dbConnect.js");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/users");
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const  HashPassword =require('./hash') ;
const nodemailer = require('nodemailer');
const stripe = require('stripe');
let PORT = process.env.PORT;
const otp = require('./otpgenerator')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/netflix documentation',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.post('/api/checkuser',async (req, res) => {
  // const token = req.body.token
  const token = req.header('Authorization')
  if(!token) {
    return console.log('No Token')
  }
  try{
  const user = jwt.verify(token,process.env.sectret_key)
  console.log('Jwt decode :' ,user)
  res.json({status: "ok", user: user})
}catch(error){
  return console.log('Invalid Token',error)
}
})
app.post("/api/register", async (req, res) => {
  res.json({ status: "ok" });
  try {
    // const error= validate(req.body)
    const user = new User(lodash.pick(req.body,["newusername","newuserEmail","newPass"]));
    const hashed = await HashPassword(user.newPass);
    user.newPass = hashed
    const final= await user.save()
    console.log(final)
  }catch (error) {
    console.log(error)
  };
})
app.post("/api/login", async (req, res) => {
  const retrieved_user = await User.findOne({
    newemail: req.body.email,
    newPass: req.body.password,
  });
  if (retrieved_user) {
    const token = jwt.sign({
      id:retrieved_user.id
    },process.env.sectret_key)
    return res.json({ status: "ok", retrieved_user: token });
  } else {
    return res.json({ status: "error", retrieved_user: false });
  }
});
app.post('/api/reset', async (req, res) => {
  res.json({ status: "ok"})
  try{
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({ 
    host:"smtp.ephereal.email",
    port : 587,
    secure : false,
    auth :{ 
      user : testAccount.user,
      pass : testAccount.pass
    }
  })
  let info = await transporter.sendMail({
    from: 'cedrickmanzii0@gmail.com', // sender address
    to: req.body.newuserEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: otp, // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}catch (error){
  console.log(error);
}
})
app.post('/api/checkout',async (req,res)=>{
  stripe.charges.create({
    source : req.body.tokenId,
    amount : req.body.amount,
    current : 'USD'
  },(StripeErr,StripeSuccess)=>{if(StripeErr){console.log(StripeErr)}else{res.status(200).json(StripeSuccess)}})
})
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
})
