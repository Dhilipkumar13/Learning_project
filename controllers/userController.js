const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const sendEmail = require("../config/sendEmail")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")
const generateAccessToken = require("../utils/generateAccessToken")
const generateRefreshToken = require("../utils/generateRefreshToken")

const registerUser = asyncHandler( async(req,res)=>{

    const {name, email, password} = req.body
    if( !name || !email || !password ){
        res.status(400)
        throw new Error("All fields must required !")
    }

    const user = await User.findOne({ email })
    if(user)
    {
        res.json({
            message:"email already exists"
        })
        
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const payload = {
        name,
        email,
        password:hashedPassword
    }
    const newUser = await User.create(payload)

    const varifyEmailUrl = `${process.env.FRONTEND_URL}verify-email?code=${newUser?._id}`
    
    const verifyEmail = await sendEmail({
        sendTo:email,
        subject:"Verify email from eccommerce",
        html:verifyEmailTemplate({
            name,
            url:varifyEmailUrl
         })
    })

    return res.json({
        message:"User register successfully",
        error:false,
        success:true,
        data:newUser
    })
})

const verifyEmail = asyncHandler( async(req,res)=>{
    const {code} = req.query

    const user = await User.findOne({ _id: code })

    if(!user){
        res.json({
            message:`Invalid code`,
            error:true,
            success:false
        })
    }

    const updateUser = await User.updateOne({ _id:code },{
        verify_email:true
    })

    return res.json({
        message:"Successfully email verify",
        error:false,
        success:true,
    })

})

const loginController = asyncHandler( async (req,res)=>{
    
    const {email , password} = req.body

    if( !email || !password){
        return res.json({
            message:"Both email and password required",
            error:true,
            success:false
        })
    }

    const user = await User.findOne({ email })

    if(!user){
        return res.json({
            message:"User not register",
            error:true,
            success:false
        })
    }

    if(user.status !== 'Active')
    {
        return res.json({
            message:"Contact admin",
            error:true,
            success:false
        })
    }

    const checkPassword = await bcrypt.compare(password , user.password)

    if(!checkPassword)
    {
        return res.json({
            message:"Check your email",
            error:true,
            success:false
        })
    }

    const accesstoken =  await generateAccessToken(user._id)
    const refreshtoken = await generateRefreshToken(user._id)

    const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite : "None"
        }
    res.cookie('accessToken',accesstoken,cookiesOption)
    res.cookie('refreshToken',refreshtoken,cookiesOption)

    return res.json({
        message:"Login successful",
        error:false,
        success: true,
        data:{
            accesstoken,
            refreshtoken
        }
    })
})
module.exports = {registerUser,verifyEmail,loginController}