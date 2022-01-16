const Product = require("../models/product")
const User = require("../models/User")

module.exports.showCart = async(req,res)=>{
   try { 
        const user = await User.findById(req.user._id).populate('cart')
        const total =await user.cart.reduce((previous,current)=> previous +current.price ,0)
        console.log(user)
        res.render("cart/cart.ejs" ,{user ,total})
    }
    catch(e){

        res.status(500).render("error",{err:e.message})
    }
}

module.exports.addToCart  = async (req,res)=>{
    try{
        const {productId} =req.params
        const userId =req.user._id;
        const product = await Product.findById(productId)
        const user = await User.findById(userId)
        
        await user.cart.push(product)
        await user.save();
        res.redirect("/user/cart")
    }
    catch(e){

        res.status(500).render("error",{err:e.message})
    }
}
module.exports.removeProduct =async (req,res)=>{
    try{
        const {productId} =req.params ;
        const userId =req.user._id;
        const user =await User.findById(userId)
        for( var i = 0; i < user.cart.length; i++){ 
        
            if ( user.cart[i] == productId) { 
                    user.cart.splice(i, 1); 
            }
        }
        await user.save()
        res.redirect("/user/cart")
    }
    catch(e){

        res.status(500).render("error",{err:e.message})
    }
}