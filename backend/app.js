const express = require("express");

const app = express();

const errormiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser"); 
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const path = require("path");


// config file
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({path:"backend/config/config.env"});
  }
  

app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileUpload())

// route exports
const product = require("./routes/productroute");
const user = require("./routes/userroute");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentroute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });  

//middlewares for error 
app.use(errormiddleware);

module.exports = app;
