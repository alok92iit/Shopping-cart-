const Product =require("../models/product")


module.exports.showAllProducts =async (req,res)=>{
    try{
    const products =await Product.find();
    req.flash('success' ,'Welcome Back Again !!')
    res.render("product/index", {products})
    }
    catch(e){

        res.status(500).render("error",{err:e.message})
    }
}

module.exports.creatProduct =(req,res)=>{
    try{
    res.render("product/new")
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
}

module.exports.addNewProduct =async (req,res)=>{
    try{
        const {name ,price ,img ,desc} =req.body
        await Product.create({name ,price,img  ,desc, author:req.user._id})
        req.flash("mymsg","Your product add successfully")
        res.redirect("products")
       
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
    }

module.exports.displaySingleProduct =async (req,res)=>{
    try{
        const {productId} =req.params;
        const showProduct =await Product.findById(productId).populate("reviews")
        res.render("product/show",{product :showProduct})
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
    }
module.exports.editProduct =async (req,res)=>{
    try{
        const {productId} =req.params;
        const editingProduct =await Product.findById(productId)
        res.render("product/edit", {product :editingProduct})
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
}

module.exports.updateProduct =async (req,res)=>{
    try{
        const {productId} =req.params;
        const {name ,price,img,desc} =req.body;
        await Product.findByIdAndUpdate(productId,{name ,price,img,desc})
        req.flash("mymsg",'Edit your product sucessfully')
        res.redirect(`/products/${productId}`)
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
    }
module.exports.deleteProduct = async (req,res)=>{
    try{
        const {productId} =req.params;
        await Product.findByIdAndDelete(productId)
        req.flash("mymsg","Deleting the product successfully")
        res.redirect("/products")
        
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
    }

    //filters

    module.exports.filters =async (req,res)=>{
        const {selectedCategory}    =req.params
        const filteredData =await Product.find({category :selectedCategory })
        res.render("product/index" ,{products :filteredData})
    }