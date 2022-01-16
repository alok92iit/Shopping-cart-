const express =require("express")
const routes =express.Router();
const Product =require("../models/product")
const {validateProduct,isLoggedIn, isSeller,isProductAuthor} =require("../middlewares")
const {showAllProducts,creatProduct,addNewProduct,displaySingleProduct,
        editProduct,updateProduct,deleteProduct, filters} =require("../controllers/product")


routes.route("/")
        // show all products
        .get(showAllProducts)
        // Add new product 
        .post(isLoggedIn,isSeller,validateProduct,addNewProduct)

// create new product
routes.get("/new", isLoggedIn,isSeller,creatProduct)

routes.route("/:productId")
        //Display/showing  a particular product
        .get(displaySingleProduct)
        //Editing the product
        .patch(isLoggedIn,isSeller,isProductAuthor,updateProduct)
        //Deleting the product
        .delete(isLoggedIn,isSeller,isProductAuthor,deleteProduct)

//product filter 
routes.route("/filter/:selectedCategory")
        .get(filters)
//showing product for editing
routes.get("/:productId/edit",isLoggedIn,isSeller,isProductAuthor,editProduct)

module.exports= routes;