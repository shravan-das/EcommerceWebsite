const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


 const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Name cannot exceed the given length"],
        minlength:[4,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate:[validator.isEmail ,"Please Enter a Valid Email"],


    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"Minimum length should be greater than 8"],
        select:false,

    },
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    avatar:
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
      },

    
      resetpasswordtoken:String,
      resetpassworddate:Date,
});

userschema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// JWT TOKEN
userschema.methods.getJWTToken =  function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// matching passwords

userschema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}


// generating password reset token

userschema.methods.getresetpasswordtoken = function (){


// generating token
const resettoken = crypto.randomBytes(20).toString("hex");

// hashing and adding resetpasswordtoken to userschema
this.resetpasswordtoken = crypto.createHash("sha256").update(resettoken).digest("hex");

this.resetpassworddate = Date.now() + 15*60*1000;

return resettoken;

}

module.exports = mongoose.model("user",userschema);

