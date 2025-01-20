const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"name require"]
    },
    email:{
        type:String,
        require:[true,"email require"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"password require "]
    },
    avator:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:"false"
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:[{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    }],
     shopping_cart:[{
        type:mongoose.Schema.ObjectId,
         ref:"cartProduct"
    }],
    order:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"order"
        }
    ],
    forget_password_otp:{
        type:String,
        default:""
    },
    forget_password_expire:{
        type:Date,
        dafault:""
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"ADMIN"
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel