const express = require("express")
const { addReview } = require("../controllers/review")
const router =express.Router()

const {validateReview,isLoggedIn} =require("../middlewares")
router.post("/products/:productID/review",isLoggedIn ,validateReview, addReview  )


module.exports= router







