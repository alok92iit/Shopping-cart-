const mongoose =require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true
        },

        price :{
            type:Number,
            min:0
        },
        img :{
            type :String,
            trim :true
        },
        desc :{
            type:String,
            trim:true
        },
        category :{
            type:String,
            trim:true
        },
        author :{
            type :mongoose.Schema.Types.ObjectId,
            ref: "User"
            
        },
        reviews:[
            {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Review"
            }
        ]
})
//mongoose middleware fuction declare inside models 
productSchema.post("findOneAndDelete" ,async function(product){

    if(product.reviews.length >0 ){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

const Product =mongoose.model("Product",productSchema)
module.exports =Product;