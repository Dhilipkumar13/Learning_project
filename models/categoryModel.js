const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name:{
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