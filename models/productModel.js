const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
    },image:{
        type:Array,
        default:[]
    },category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"category"
        }
    ],
    sub_category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"subCategory"
        }
    ],
    unit:{
        type:String
    },
    stock:{
        type:Number
    },
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    description:{
        type:String,
        default:""
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean
    }
},{
    timestamps:true
})

const productModel = mongoose.model("products",productSchema)

module.exports = productModel