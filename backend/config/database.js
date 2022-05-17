const mongoose = require("mongoose");

const DBconnection = () => {
  console.log(process.env.DB_URI)
  mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`mongoDb connected to ${data.connection.host}`);
    });
};

module.exports = DBconnection;
