const jwt = require("jsonwebtoken")

const generateAccessToken = async(userId)=>{
    const token = await jwt.sign({id:userId},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:'20m'}
    )
    return token
}

module.exports = generateAccessToken