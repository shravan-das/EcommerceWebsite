const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]

    },

    price:{
        type:String,
        required:[true,"Please enter price of product"],
        maxLength:[8,"Length cannot exceed the limit"]
    },

    ratings:{
        type:Number,
        default:0,
    },

    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
      }
    ],

    category:{
        type:String,
        required:[true , "Please Enter Product Category"]
    },

    stock:{
        type:String,
        required:[true , "Please Enter the stock"],
        maxLength:[4,"Stock Level Exceeded"],
        default:0
    },

    NumReviews:{
        type:Number,
        default:0,
    },

    reviews:[
        {
            user:{

                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:false,
        
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:String,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],

    user:{

        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,

    },

    createdAt:{
        type:Date,
        default:Date.now,

    }
})


module.exports = mongoose.model("product",productSchema)