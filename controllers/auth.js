const User = require("../models/User")

module.exports.signUp = (req,res)=>{
    res.render("auth/signUp");
}

module.exports.registerNewUser = async (req,res)=>{
     
    try{
        const {username,email,role,password} =req.body
        const user = new User({username,email,role})
        const  newuser =await User.register(user,password)
        req.login(newuser,function(err){
            if(err){
                return next(err)
            }
            req.flash("mymsg","You are registered succesfully")
            res.redirect("/products")
        })
    }
    catch(err){
        req.flash("error",err.message)
        res.redirect("/register")
    }
}
             
module.exports.loginForm = (req,res)=>{
   
    res.render("auth/login")
}


module.exports.loginUser = (req,res)=>{
    req.flash('mymsg',`Welcome Back ${req.user.username} !!`)
    Url  =req.session.returnUrl ||"/products"
    if(Url && Url.indexOf('review')!==-1){
        Url=Url.split("/")
        Url.pop()
        Url=Url.join('/')
    }
    else if(Url && Url.indexOf('like')!==-1){
        return res.redirect('/products')
    }
    delete req.session.returnUrl
    res.redirect(Url)

}
module.exports.logoutUser = (req,res)=>{
    req.logout();
    req.flash("mymsg" , "Yoy are successfully Logout")
    res.redirect("/products")

}