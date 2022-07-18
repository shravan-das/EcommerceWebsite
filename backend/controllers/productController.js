
const ErrorHander = require("../utills/errorhandling");
const Product = require("../models/productmodel");
const catchasyncerrors = require("../middleware/asyncerror");
const apifeatures = require("../utills/apifeatures");
const cloudinary = require("cloudinary");

// create product:ADMIN CAN CREATE
exports.createproduct = catchasyncerrors(async (req, res, next) => {

    let images =[];

    if(typeof req.body.images==='string'){
        images.push(req.body.images);

    }
    else{
        images = req.body.images;

    }

    const imagesLink = [];
    for(let i = 0 ; i<images.length ; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        })
        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url,
        })

    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;


    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });

});

// GET ALL PRODUCTS

exports.getAllProducts = catchasyncerrors(async (req, res ,next) => {

    // return next(new ErrorHander("Temporary error try again",500));
    const resultperpage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new apifeatures(Product.find(), req.query).search().filter()
    let products = await apiFeature.query;

    let filtererdProductsCount = products.length;
    apiFeature.pagination(resultperpage); 
    products = await apiFeature.query;
    res.status(200).json(
        {
            success: true,
            products,
            productsCount,
            resultperpage,
            filtererdProductsCount,
        }
    );
});

// GET ALL PRODUCTS ONLY ADMIN

exports.getAdminProducts = catchasyncerrors(async (req, res ,next) => {

    // return next(new ErrorHander("Temporary error try again",500));
   const  products = await Product.find()
    res.status(200).json(
        {
            success: true,
            products,
            
        }
    );
});
// GET A SINGLE PRODUCT DETAIL
exports.getProductdetail = catchasyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});



// update all products: admin only 

exports.updateProduct = catchasyncerrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    let images =[];

    if(typeof req.body.images==='string'){
        images.push(req.body.images);

    }
    else{
        images = req.body.images;

    }


    if(images !== undefined){
        for(let i = 0 ; i< product.images.length ; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
           }

           const imagesLink = [];
           for(let i = 0 ; i<images.length ; i++){
               const result = await cloudinary.v2.uploader.upload(images[i],{
                   folder:"products",
               })
               imagesLink.push({
                   public_id:result.public_id,
                   url:result.secure_url,
               })
       
           }


           req.body.images = imagesLink;
    } 


    

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });

    res.status(200).json({
        success: true,
        product
    });


});



// DELETE A PRODUCT

exports.DeleteProduct = catchasyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }


    // deleting images from cloudinary

    for(let i = 0 ; i< product.images.length ; i++){
     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted",
    });
});

// create reviews for product

exports.createproductreview = catchasyncerrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());


    if (isReviewed) {
        product.reviews.forEach(rev => {

            if (rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                    rev.comment = comment

        })

    }

    else {
        product.reviews.push(review);
        product.NumReviews = product.reviews.length;
    }

    let average = 0;

    product.ratings = product.reviews.forEach(rev => {
        average = average + rev.rating;
    })
    product.ratings = average / product.reviews.length;

    await product.save({
        validateBeforeSave: false,
    });

    res.status(200).json({
        success: true,
    });


})



// get all reviews of a product


exports.getproductreviews = catchasyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHander("product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// delete a particular review of product

exports.deletereview = catchasyncerrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHander("product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg= 0;
    reviews.forEach((rev) => {
        avg += rev.rating
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
        
    }
    const NumReviews = reviews.length;


    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        NumReviews,


    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    res.status(200).json({
        success: true,
    });
})