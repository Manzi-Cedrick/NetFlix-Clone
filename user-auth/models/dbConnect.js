const mongoose = require("mongoose");
module.exports = mongoose.connect(process.env.db_connect, (err) => {
    if (err) {
      console.log("Failed to connect : " + err);
      return;
    }
    console.log("db connection established");
  });