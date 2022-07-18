const express = require("express");
const { neworder,  getsingleorder, myOrders, getallorders, updateorderstatus, deleteorder } = require("../controllers/ordercontrollers");
const router = express.Router();
const { isAuthenticatedUser, userrole} = require("../middleware/auth");



router.route("/order/new").post(isAuthenticatedUser,neworder);
router.route("/order/:id").get(isAuthenticatedUser,getsingleorder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders").get(isAuthenticatedUser,userrole("admin") ,getallorders);
router.route("/admin/order/:id").put(isAuthenticatedUser,userrole("admin") ,updateorderstatus).delete(isAuthenticatedUser,userrole("admin") ,deleteorder);


module.exports = router;
