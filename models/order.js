const mongoose = require("mongoose")
const Product = require("./product")

const orderSchema =new mongoose.Schema({

    trnxnId :{
        type: String
    },
    amount : {
        type:String
    },
    productInfo :{
       type : String 
    },
    orderedProduct :[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Product'
        }
    ]

}, { timestamps: true })

const Order = mongoose.model('Order',orderSchema );


module.exports =Order