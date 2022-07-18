const express = require("express");
const { getAllProducts,createproduct,updateProduct,DeleteProduct,getProductdetail, createproductreview, getproductreviews, deletereview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, userrole} = require("../middleware/auth");


const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser,userrole("admin") , getAdminProducts)
router.route("/admin/product/new").post(isAuthenticatedUser,userrole("admin"),createproduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,userrole("admin"),updateProduct).delete(isAuthenticatedUser,userrole("admin"),DeleteProduct);


router.route("/product/:id").get(getProductdetail);
router.route("/review").put(isAuthenticatedUser,createproductreview);
router.route("/productreviews").get(getproductreviews).delete(isAuthenticatedUser, deletereview);

module.exports = router;