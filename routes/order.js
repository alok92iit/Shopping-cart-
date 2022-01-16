 const express =require("express")
 const router =express.Router()





 router.get("/user/order",(req,res)=>{
     res.render("orders/order.ejs")
 })


 module.exports =router