const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    subCategoryName:{
        type:String
    },
    image:{
        type:String
    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"categorys"
    }
},{
    timestamps:true
})

const subCategoryModel = mongoose.model("subCategorys",subCategorySchema)

module.exports = subCategoryModel