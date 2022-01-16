const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const userSchema = new mongoose.Schema({
    email :{
        type :String,
        trim :true,
        required :true
    },
    role:{
        type:String
    },
    cart :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    order :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'Product'
    },
    wishlist:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref :"Product"
        }
    ]
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate);
const User = mongoose.model("User" ,userSchema)


module.exports =User ;