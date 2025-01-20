const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"category"
    }
},{
    timestamps:true
})

const subCategoryModel = mongoose.model("subCategory",subCategorySchema)

module.exports = subCategoryModel