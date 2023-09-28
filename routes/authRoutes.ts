const express=require("express");

const authController=require("../controllers/authController")

const router=express.Router();


router.route('/').post(authController.login)
router.route('/signup').post(authController.signup)
router.route('/refresh').get(authController.refresh)
router.route('/logout').post(authController.logout)



module.exports=router

