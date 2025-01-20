const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const generateRefreshToken = async(userId)=>{
    const token = await jwt.sign({id:userId},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:'7d'}
    )

    const updateRefreshTokenUser = await  User.updateOne({_id:userId},
        {
            refresh_token :  token
        }
    )
    return token
}

module.exports = generateRefreshToken