const Product =require("../models/product")
const Review =require("../models/review")


module.exports.addReview =async (req,res)=>{
    try{
        const {productID} =req.params;
        const {rating,comment} =req.body;
        const selectedProduct =await Product.findById(productID)
        const review =new Review({rating ,comment})
        selectedProduct.reviews.push(review)

        await review.save()
        await selectedProduct.save()
        req.flash('mymsg', 'Added your review successfully!');
        res.redirect(`/products/${productID}`)
    }
    catch(e){
        res.status(500).render('error', { err: e.message });
    }
    }