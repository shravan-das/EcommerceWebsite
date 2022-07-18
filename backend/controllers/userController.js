const catchasyncerrors = require("../middleware/asyncerror");
const ErrorHander = require("../utills/errorhandling");
const User = require("../models/usermodels");
const sendtokens = require("../utills/JwtTokens");
const sendemail = require("../utills/sendemail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { findByIdAndUpdate } = require("../models/usermodels");


// REGISTER A USER
exports.registeruser = catchasyncerrors(async(req,res,next)=>{

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",

    })
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    sendtokens(user,200,res);
})


// LOGIN FUNCTION FOR USER

exports.loginuser = catchasyncerrors(async(req,res,next)=>{
    const {email,password} = req.body;
    
    // checking if user has given email and password both
    if(!email || !password){
        return next(new ErrorHander("please enter both email and passwword",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password entered by user",401));
    }

    sendtokens(user,200,res);


    
});

// Logoutfunctionforuser

exports.logout = catchasyncerrors(async(req,res,next)=>{
    res.cookie("token" , null , {
        expires: new Date(Date.now()),
        httpOnly:true,

    })

    res.status(200).json({
        success:true,
        message:"logged out",
    });
});

// forgot password

exports.forgotpassword = catchasyncerrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHander("User not found",404))
    }

    // get reset password token
    const resettoken = user.getresetpasswordtoken();

    await user.save({validateBeforeSave:false});

    const resetpasswordurl = `${req.protocol}://${req.get("host")}/password/reset/${resettoken}`;

    const message = `your reset password token is Below : \n\n ${resetpasswordurl} \n\n if you have not requested this email then please ignore it.`;

    try {

        await sendemail({
            email: user.email,
            subject:`ecommerce password recovery`,
            message,

        })

        res.status(200).json({
            success:true,
            message:`email sent to ${user.email} successfully`,
        })
        
    } catch (error) {

        user.resetpasswordtoken = undefined;
        user.resetpassworddate = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(err.message,500))
        
    }

});

//  AFTER CLICKING RESET PASSWORD LINK
exports.resetpassword = catchasyncerrors(async(req,res,next)=>{



    const resetpasswordtoken = crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetpasswordtoken,
        resetpassworddate:{$gt:Date.now()},
    });

    if(!user){
        return next(new ErrorHander("user is not found" , 400 ));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHander("password doesnt match" , 400))
    }


    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpassworddate = undefined;

    await user.save();

    sendtokens(user,200,res);




})


// GET USER DETAILS
exports.getUserDetails = catchasyncerrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });

});


// Update user password
exports.updatepassword = catchasyncerrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password is not matched" , 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendtokens(user,200,res)
})

// update user profile

exports.updateuserprofile = catchasyncerrors(async(req,res,next)=>{
    const newuserdata = {
        name:req.body.name,
        email:req.body.email,

    }


    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
    
        })


        newuserdata.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }


    }

    const user =  await User.findByIdAndUpdate(req.user.id , newuserdata,{
        new : true,
        runValidators:true,
        userFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        user,
    });
})


// GET ALL USERS: ADMIN


exports.getallusers = catchasyncerrors(async(req,res,next)=>{
    const users = await User.find();


    res.status(200).json({

        success:true,
        users,

    });
});

//GET DETAIL OF SINGLE USER: ADMIN

exports.getoneuser = catchasyncerrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander(`User doesnt exist with id :${req.params.id}`))
    };


    res.status(200).json({
        success:true,
        user,
    });
})



// update user role

exports.updateuserrole = catchasyncerrors(async(req,res,next)=>{
    const newuserdata  = {
        name:req.body.name,
        email:req.body.email,
        role : req.body.role,
    }


     await User.findByIdAndUpdate(req.params.id , newuserdata , {
        new:true,
        runValidators:true,
        userFindAndModify:false,

    });
   
    

    res.status(200).json({
        success: true,
        
    });
})


// delete user : admin
 exports.deleteuserprofile = catchasyncerrors(async(req,res,next)=>{

    const user  = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`User doesnt exist with id:${req.params.id}`))
    }

    await user.remove();
  // we will remove cloudinary

  res.status(200).json({
      success:true,
      message:"user deleted succesfully"

  });


 });





