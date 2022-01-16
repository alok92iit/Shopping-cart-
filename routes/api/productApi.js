const express =require("express")
const router =express.Router()
const { isLoggedIn } = require("../../middlewares")
const User = require("../../models/User")





router.post("/:productId/like",isLoggedIn,async (req,res)=>{
    
    const {productId} =req.params
    const user =req.user ;
    const isLiked = user.wishlist.includes(productId) 
   
    
   //if(isliked){
    //  req.user =  await User.findByIdAndUpdate(req.user._id,{ $pull: {wishlist :productId}})
   // }
   // else{
       ///req.user = await User.findByIdAndUpdate(req.user._id,{$pull :{wishlist :productId}})
   //// }          
    const option = isLiked ? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishlist: productId } },{new:true});

    res.send("Like Api")
    
})



module.exports =router