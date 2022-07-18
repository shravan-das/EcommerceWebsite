const express = require("express");
const { registeruser, loginuser, logout, forgotpassword, resetpassword, getUserDetails, updatepassword, updateuserprofile, getallusers, getoneuser, updateuserrole, deleteuserprofile } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, userrole} = require("../middleware/auth");






router.route("/register").post(registeruser);
router.route("/login").post(loginuser);

router.route("/password/forgot").post(forgotpassword)

router.route("/password/reset/:token").put(resetpassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatepassword);
router.route("/me/update").put(isAuthenticatedUser , updateuserprofile);


router.route("/admin/users").get(isAuthenticatedUser ,userrole("admin") ,getallusers);
router.route("/admin/user/:id").get(isAuthenticatedUser,userrole("admin"),getoneuser).put(isAuthenticatedUser,userrole("admin"),updateuserrole).delete(isAuthenticatedUser , userrole("admin") , deleteuserprofile);



module.exports = router;