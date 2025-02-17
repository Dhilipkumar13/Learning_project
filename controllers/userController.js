const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const sendEmail = require("../config/sendEmail")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")
const generateAccessToken = require("../utils/generateAccessToken")
const generateRefreshToken = require("../utils/generateRefreshToken")
const generateOtp = require("../utils/generateOtp")
const forgetPasswordTemplate = require("../utils/forgetPasswordTemplate")

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

    console.log(user+" "+ code);

    if(!user){
        res.json({
            message:`Invalid code`,
            error:true,
            success:false
        })
    }

    const updateUser = await User.updateOne({ _id:code },
        {$set :{ verify_email:true }})

    console.log(updateUser);

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
        res.cookie("accessToken", accesstoken, { cookiesOption }); 
        res.cookie("refreshToken", refreshtoken, { cookiesOption }); 

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

const logoutController = asyncHandler( async(req, res)=>{

    const userId = req.userId

    cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }

    res.clearCookie("accessToken", { cookiesOption });
    res.clearCookie("refreshToken", { cookiesOption });
    
    const removeRefreshToken = await User.findByIdAndUpdate(userId,{
        refreshtoken : ""
    })

    return res.json({
        message:"successful",
        error : false,
        success : true
    })
})

const updateUserDetails = async(req ,res) => {
    try {

        const userId = req.userId
        const {name, email, password, phone} = req.body

        let hashedPassword;
        if(password){
            const salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password,salt)
        }

        const updateUser = await User.findByIdAndUpdate( userId,{
            ...(name && { name : name}),
            ...(email && { email : email}),
            ...(phone && { phone : phone}),
            ...(hashedPassword && { password : hashedPassword})
        })

        return res.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error : true,
            success : false
        })
    }
}

const forgetPasswordController = async(req, res)=> {
    try {

        const {email} = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : " email not found",
                error : true,
                success : false
            })
        }

        const otp = generateOtp()
        const expireDate = new Date(Date.now() + 60*60*1000)

        const update = await User.findByIdAndUpdate(user._id,{
            forget_password_otp:otp,
            forget_password_expire: new Date(expireDate).toISOString()
        },
        { new:true}
    )
        console.log(update, " * ",otp," * ",expireDate)


        await sendEmail({
            sendTo : email,
            subject : "Forget password from eccommerce",
            html : forgetPasswordTemplate({
                name: user.name,
                otp : otp
            })
        })

        return res.json({
            message : "check your email for otp",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

const verifyForgetPasswordOtp = async (req, res) => {
    try {

        const { email, otp} = req.body

        if( !email || !otp){
            return res.status(400).json({
                message : "Provide requirement email, otp",
                error : true,
                success : false
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User email not found",
                error : true,
                success : false
            })
        }

        const currentDate = new Date().toISOString
        console.log(user)

        if(currentDate<user.forget_password_expire){
            return res.status(400).json({
                message : "otp expire",
                error : true,
                success : false
            })
        }

        if(otp !== user.forget_password_otp){
            return res.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }

        const updateUser = await User.findByIdAndUpdate(user._id,{
            forget_password_expire:"",
            forget_password_otp:""
        })

        return res.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

const resetPassword = async (req, res) => {
    try {

        const { email, newPassword, confirmedPassword} = req.body;

        if(!email || !newPassword || !confirmedPassword){
            return res.status(400).json({
                message : "Provide all requirement",
                error : true,
                success : false
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User not found",
                error : true,
                success : false
            })
        }

        if( newPassword !== confirmedPassword){
            return res.status(400).json({
                message : "Check for password correctly",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,salt)

        await User.findByIdAndUpdate(user._id,{
            password: hashedPassword
        })

        return res.json({
            message : "Password updated successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

module.exports = {registerUser,verifyEmail,loginController,logoutController,updateUserDetails,forgetPasswordController,verifyForgetPasswordOtp,resetPassword}