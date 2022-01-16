if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express= require("express")
const app= express();
const path =require("path");
const ejsMate =require("ejs-mate")
const methodOverride =require('method-override')
const mongoose =require("mongoose")
const session =require("express-session")
const flash =require("connect-flash")
const passport =require("passport")
const localStretgy =require("passport-local")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User =require("./models/User")
//const helmet =require("helmet")
const MongoStore = require('connect-mongo');

const dbUrl = process.env.dbUrl || 'mongodb://localhost:27017/shopping-app'

mongoose.connect(dbUrl)
.then(()=>console.log("Database connected"))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine("ejs",ejsMate)
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, 'views'));
//app.use(helmet({contentSecurityPolicy:false}));

const secret = process.env.SECRET || 'myownsecret'
const store =MongoStore.create({
    secret: secret,
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
});


const sessionConfig={
    store,
    name : "mySession",
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,    //it ensure no one acess our cookie directly using JS
        expire: Date.now() +1000*60*60*24*7*1,
        maxAge :1000*60*60*24*7
    }
  }

  app.use(session(sessionConfig));
  app.use(flash())
 
 // Passport initailize middleware
app.use(passport.initialize())
app.use(passport.session())

//session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//telling the passport to check username and password using authentiction method of passport local mongoose
passport.use(new localStretgy(User.authenticate()));

// Authentication With Google 
const calllbackFun =function(accessToken, refreshToken, profile, cb) {
    const username=profile.emails[0].value.split("@")
    User.create({ email: profile.emails[0].value ,username:username[0],role:"buyer"},function(err, val) {
        User.findOrCreate({email: profile.emails[0].value,username:username[0],role:"buyer"},function(err, user) {
          
                   return cb(err,user)
               })
             });
  }
passport.use(new GoogleStrategy(
    {
        clientID: process.env.client_id  ,
        clientSecret: process.env.client_secret ,
        callbackURL: process.env.callback_url  ||'http://localhost:8080/login/auth', 
    },calllbackFun)
);


app.use((req,res,next)=>{
    //this is the type of global varible we can use i any temlate 
    res.locals.currentUsers =req.user;
    res.locals.mymsg = req.flash('mymsg');
    res.locals.error   =req.flash("error");
    next();
})
//Route file import
const router =require("./routes/product")
const reviewRouter =require("./routes/reviewRoute")
const authRouter   =require("./routes/auth")
const cartRoute    =require("./routes/addCart") 
const payments     =require("./routes/payments")
const order        =require("./routes/order")
//API's

const productApi   =require("./routes/api/productApi")
app.get("/",(req,res)=>{
    res.render("home" ,{currentUser: req.user})
})
app.use("/products",router);
app.use(reviewRouter);
app.use(authRouter)
app.use("/products",productApi)
app.use("/user",cartRoute)
app.use(payments)
app.use(order)

app.all("*",(req,res)=>{
    res.render('error',{err :'You are requesting a wrong Url !!!..'})
})
const  port =process.env.PORT ||8080
app.listen(port,()=>{
    console.log("server started")
})