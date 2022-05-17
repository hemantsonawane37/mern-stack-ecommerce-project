const express = require("express");
const app = express();
app.use(express.json());
const Cors = require("cors");
if(process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config({ path: "backend/config/config.env" });
const errormiddleware = require("./middleware/error");
const ProductR = require("./routes/productroutes");
const UserR = require("./routes/userroute");
const OrderR = require("./routes/Orderroutes")
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");




const corsOptions = {
    origin: ['http://localhost:3000','http://192.168.0.5:3000'] , 
    credentials:true,  
    optionSuccessStatus:200 // For legacy browser support
}

app.use(Cors(corsOptions))
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false })); 




//Routes
app.use("/api/v1", ProductR);
app.use("/api/v1", UserR);
app.use("/api/v1", OrderR);

app.use(express.static(path.join(__dirname,'../frontend/build')));
app.get("*",(req,res)=> {
 res.sendFile(path.join(__dirname,"../frontend/build/index.html"))
})

app.use(errormiddleware);

module.exports = app;