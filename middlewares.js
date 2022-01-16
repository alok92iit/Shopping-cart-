const {productSchema,reviewSchema} =require("./joiSchema")
const Product = require("./models/product")

    module.exports.isSeller = (req,res,next)=>{
        
        
        if(!(req.user.role && req.user.role=='seller')){

            req.flash('error',"You don't have permission to do that")
            res.redirect("/products")
        }
            next()
    }

    module.exports.isLoggedIn=(req,res,next)=>{
        
        if(req.xhr && !req.isAuthenticated()){
                return res.status(401).json({msg:'You need to login First'})

            }
        req.session.returnUrl =req.originalUrl //it will return current url of page 
        
        if(!req.isAuthenticated()){
                req.flash('error',"Yon Need To Login First")
                return(res.redirect("/login"))
            }
            next()
    }

    module.exports.validateProduct = (req, res, next) => {
        const { name,price,img ,desc } = req.body;
        const { error} = productSchema.validate({ name, price,img,desc });
    
        if (error) {
            const msg = error.details.map((err)=>err.message).join(',')
            return res.render('error', { err: msg });
        }
    
        next();
    }

    module.exports.validateReview = (req,res,next) => {
    
        const { rating, comment } = req.body;
        const { error } = reviewSchema.validate({ rating, comment });
    
        if (error) {
            const msg = error.details.map((err)=>err.message).join(',')
            // console.log(msg);
            return res.render('error', { err: msg });
        }
        next();
    }
    
    module.exports.isProductAuthor =async (req,res,next)=>{
        const {productId} =req.params;
       
        const product =await Product.findById(productId)
        console.log(product.author)
        console.log(req.user)
       
        if(!(product.author && product.author.equals(req.user._id))){
                            
            req.flash("error","You don't have permission to do that")
            return res.redirect(`/products/${productId}`)
        }
        next()
    }