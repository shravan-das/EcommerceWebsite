const ErrorHandler = require("../utills/errorhandling");


module.exports =(err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // WRONG MONGODB ID ERROR
    if(err.name =="CastError"){
        const message = `invalid error:${err.path}`;
        err = new ErrorHandler(message,400);

    }
    // mongoose key duplicate error
    if(err.code === 1100){
        const message = `duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }
   
    // wrong jwt error
    if(err.name ==="JsonWebTokenError"){
        const message = `json web token is invalid please try again`;
        err = new ErrorHandler(message,400);

    }

    // jwt expire error
    if(err.name==="TokenExpiredError"){
        const message = `Token is expired please try again`;
        err = new ErrorHandler(message,400);

    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });


}