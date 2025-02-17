const mongoose = require("mongoose")

const  orderSchema =new mongoose.Schema({
    userid:[
        {
        type:mongoose.Schema.ObjectId,
        ref:"users"
        }
    ],
    orderId:{
        type:String,
    },
    product_details:{
        type:String
    },
    paymentId:{
        type:String
    },
    payment_status:{
        type:String
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    delivery_status:{
        type:String
    },
    subTotalAmt:{
        type:Number,
        default:0
    },
    totalAmt:{
        type:Number,
        default:0
    },
    invoice_recepit:{
        type:String
    }
},{
    timestamps:true
})

const orderModel = mongoose.model("order",orderSchema)

module.exports = orderModel