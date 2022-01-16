const express =require("express")
const router =express.Router()
const Razorpay =require("razorpay")
const bodyParser = require('body-parser')
const User  =require("../models/User")
router.use(bodyParser.json())

const razorpayInstance= new Razorpay({
  
     //Replace with your key_id
    key_id: process.env.key_id ,
  
  //  Replace with your key_secret
    key_secret: process.env.key_secret

})
router.post('/createOrder',async (req, res)=>{ 
  
    // STEP 1:
   // console.log(req.body)
try{
    const user =await User.findById(req.user._id).populate('cart')
    const total =user.cart.reduce((previous,current)=> previous + current.price ,0)*100
    // STEP 2:    
    const response =await razorpayInstance.orders.create({'amount':total, 'currency':"INR",'receipt': 123458}) 
    
        res.json({
          'id': response.id,
          'currency': response.currency,
          'amount': response.amount,
          'userName':user.username,
          'userEmail' :user.email,
          'total' : total 
        }) 
      }  
      catch(err){
        res.status(500).render("error",{err:err.message})
      }
})    


         
         
         
   //      if(!err){
  //          console.log(`message from server ${order}`)
     //       res.json(order)
    //      }
    //      else
    //        res.send(err);
   //     }
  //  )
module.exports =router