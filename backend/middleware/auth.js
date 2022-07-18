const ErrorHander = require("../utills/errorhandling");
const asyncerror = require("./asyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");


exports.isAuthenticatedUser = asyncerror(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHander("Please login again to access this resource",401))
    }

    const decodeddata = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodeddata.id);
    next();

}) ;


exports.userrole = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
        return next( 
            new ErrorHander(`Role:${req.user.role} is not allowed to acess the account`,
            403
            )
            );
        }
        next();

    };

};