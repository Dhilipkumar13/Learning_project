const mongoose = require("mongoose")

const cartProductSchema = mongoose.Schema({
    productid:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"product"
        }
    ],
    quntity:{
        type:Number,
        default:1
    },
    userid:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"users"
        }
    ]
},{
    timestamps:true
})

const cartProductModel = mongoose.model("cartProducts",cartProductSchema)

module.exports = cartProductModel
