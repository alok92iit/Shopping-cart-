const express =require("express");
const passport = require("passport");

const {signUp, registerNewUser, loginForm, loginUser, logoutUser} =require("../controllers/auth")
const router  =express.Router()


//router.get("/fakeuser" ,async (req,res)=>{
//    const user ={
//        email :"abc@getMaxListeners.com",
//        username :"abc"
//    }
//    const newUser = await User.register(user,"1234");
//    res.send(newUser)
//})

router.route("/register")
        .get(signUp)
        .post(registerNewUser)

router.route("/login")
        .get(loginForm)
        .post(passport.authenticate('local',{
                failureRedirect :"/login",
                failureFlash :true
                }),loginUser);

router.get('/login/google', passport.authenticate('google',
 {
    scope: ["profile" ,'email']
    
  }));

router.get('/login/auth',
  passport.authenticate('google', { 
    successRedirect:'/products',
    failureRedirect: '/login' }),
  );
//logout 
router.get("/logout",logoutUser);
module.exports =router