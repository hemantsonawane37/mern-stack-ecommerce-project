const app = require("./app");
var cloudinary = require('cloudinary').v2;



const DBconnection = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`shutting down server due to uncaughtException `);
  server.close(() => {
    process.exit(1);
  });
});


  

//database connection
DBconnection();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true
});


const server = app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT} `);
});


// unhandle promise rejaction
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log(`shutting down server due to unhandle promise rejaction `);
  server.close(() => {
    process.exit(1);
  });
});
