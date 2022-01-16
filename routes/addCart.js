const express =require("express")
const { showCart, addToCart, removeProduct } = require("../controllers/cart")
const { isLoggedIn } = require("../middlewares")
const router =express.Router()
router.get("/cart",isLoggedIn ,showCart)

router.post("/:productId/cart",isLoggedIn,addToCart)

router.get("/:productId/removeProduct",isLoggedIn,removeProduct)



module.exports =router;
