const jwt = require("jsonwebtoken")

const auth =async (req, res,next ) => {
    try{
        const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

        if( !token ){
            return res.status(401).json({
                message : "Provide accesstoken"
            })
        }

        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if(!decoded){
            return res.status(402).json({
                message : "Invalid access",
                status : false,
                error : true
            })
        }

        req.userId = decoded.id

        next()
    }
    catch(error ){
        return res.status(500).json({
            message : "you have not login",
            error : true,
            success : false
        })
    }
}

module.exports = auth