const {VALIDATION_ERROR,UNAUTHORIZED,FORBIDDEN,NOT_FOUND,SERVER_ERROR} = require("../constant").constants

const errorHandler = (err,req,res,next) =>{

    //console.log(VALIDATION_ERROR,UNAUTHORIZED,FORBIDDEN,NOT_FOUND,SERVER_ERROR)
    const statusCode = res.statusCode ? res.statusCode : 500 
    switch (statusCode) {
        case VALIDATION_ERROR:
            res.json({title:"Validation error", message:err.message,stackToken:err.stack })
            break;
        case UNAUTHORIZED:
            res.json({title:"Unauthorized", message:err.message,stackToken:err.stack })
            break;
        case FORBIDDEN:
            res.json({title:"Forbidden", message:err.message,stackToken:err.stack })
            break;
        case NOT_FOUND:
            res.json({title:"Not Found", message:err.message,stackToken:err.stack })
            break;
        case SERVER_ERROR:
            res.json({title:"Server error", message:err.message,stackToken:err.stack })
            break;
        default:
            console.log("No error! All good")
            break;
    }
}

module.exports = errorHandler