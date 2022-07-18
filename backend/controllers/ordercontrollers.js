const Order = require("../models/ordermodels");
const Product = require("../models/productmodel");
const user = require("../models/usermodels");
const ErrorHander = require("../utills/errorhandling");
const catchasyncerror = require("../middleware/asyncerror");



// create new order

exports.neworder = catchasyncerror(async(req,res,next)=>{
    const{shippingInfo,
        orderItems, 
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice} = req.body;


        const order =  await Order.create({
        shippingInfo,
        orderItems, 
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id, 
    });
    res.status(201).json({
        success:true,
        order,
    })
});



// get single order
exports.getsingleorder = catchasyncerror(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this id",404));
    }

    res.status(200).json({
        success:true,
        order,
    })

})

// get order detail of logged in user
exports.myOrders = catchasyncerror(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id});
  
    res.status(200).json({
      success: true,
      orders,
    });
  });


// get all orders
exports.getallorders = catchasyncerror(async(req,res,next)=>{
    const orders = await Order.find();

    let totalamount = 0;
    orders.forEach(order=>{
        totalamount = totalamount + order.totalPrice;
    });
    res.status(200).json({
        sucess:true,
        totalamount,
        orders,
    })
});



// update order status

exports.updateorderstatus = catchasyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("order not found",404));
    }

    if(order.orderstatus==="Delivered"){
        return next(new ErrorHander("This product is already delivered",404));
    }

    order.orderitems.forEach(async(order)=>{
        await updateStock(order.product , order.quantity)
    });

    order.orderstatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.delieveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false})
    res.status(200).json({
        success:true,
   });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave:false });
}



// delete order


exports.deleteorder = catchasyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("order not found",404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
    });
})


