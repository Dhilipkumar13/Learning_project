const express = require("express")
const router = express.Router()
const {registerUser, verifyEmail, loginController ,logoutController ,updateUserDetails,forgetPasswordController,resetPassword ,verifyForgetPasswordOtp } = require("../controllers/userController")
const auth = require('../middleware/auth')

router.post('/register',registerUser)
router.post('/verify-email',verifyEmail)
router.post('/login',loginController)
router.get('/logout',auth,logoutController)
router.put('/update-details',auth,updateUserDetails)
router.put('/forget-password',forgetPasswordController)
router.put('/reset-password',resetPassword)
router.put('/verify-password',verifyForgetPasswordOtp)

module.exports = router