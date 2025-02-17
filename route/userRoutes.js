const express = require("express")
const router = express.Router()
const {registerUser, verifyEmail, loginController ,logoutController ,updateUserDetails,forgetPasswordController,resetPassword ,verifyForgetPasswordOtp } = require("../controllers/userController")
const {uploadProduct, createCategory, createSubCategory} = require('../controllers/productController')
const auth = require('../middleware/auth')

router.post('/register',registerUser)
router.post('/verify-email',verifyEmail)
router.post('/login',loginController)
router.get('/logout',auth,logoutController)
router.put('/update-details',auth,updateUserDetails)
router.put('/forget-password',forgetPasswordController)
router.put('/verify-otp-password',verifyForgetPasswordOtp)
router.put('/reset-password',resetPassword)
router.post('/product',uploadProduct)
router.post('/new-category',createCategory)
router.post('/new-subcategory',createSubCategory)

// ommit
module.exports = router