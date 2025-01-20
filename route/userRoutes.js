const express = require("express")
const router = express.Router()
const registerUserController = require("../controllers/userController")


router.post('/register',registerUserController.registerUser)
router.post('/verify-email',registerUserController.verifyEmail)
router.post('/login',registerUserController.loginController)


module.exports = router