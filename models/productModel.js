const mongoose = require("mongoose")

const productSchema =new mongoose.Schema({
    name:{
        type:String,
    },image:{
        type:Array,
        default:[]
    },categoryId:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"categorys"
        }
    ],
    subCategoryId:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"subCategorys"
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
        type:Number,
        default:0
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