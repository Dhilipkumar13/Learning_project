const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String
    },
    Image:{
        type:String
    }
},{
    timestamps:true
})

const categoryModel = mongoose.model("categorys",categorySchema)

module.exports = categoryModel