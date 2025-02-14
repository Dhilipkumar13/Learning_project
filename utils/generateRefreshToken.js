const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const generateRefreshToken = async(userId)=>{
    const token = jwt.sign({id:userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn:'7d'}
    )

    await  User.updateOne({_id:userId},
        {$set :{
            refresh_token :  token
        }}
    )
    return token
}

module.exports = generateRefreshToken 