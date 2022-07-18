const app = require("./app");
const cloudinary = require("cloudinary")


 

const connectDatabase = require("./config/database");

// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});
 


// config file
if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({path:"backend/config/config.env"});
}

// connecting database
connectDatabase();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})
// handling uncaught error
// console.log(hello);

// UNHANDLED PROMISE REJECTION
process.on("unhandledRejection" , (err)=>{
    console.log(`error:${err.message}`);
    console.log(`shutting down the server due to unhandled rejection`);
    server.close(()=>{
        process.exit(1);
    });
});