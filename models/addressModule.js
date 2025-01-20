const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
     address_line:{
        type:String,
        default:""
     },
     city:{
        type:String
     },
     state:{
        type:String
     },
     pincode:{
        type:String
    },
     country:{
        type:String
    },
      moblie:{
        type:Number,
        default:null
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const addressModule = mongoose.model("address",addressSchema)

module.exports = addressModule 