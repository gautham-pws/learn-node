const express = require('express')
const router = express.Router()
const path = require('node:path')

// register a route: add-product
router.use("/add-product",(req,res,next)=>{
    console.log("first middleware")
    //define respsonse, here a form which calls /product route
//    res.send("<form action='product' method='post'><input type='text' name='title'/><button type='submit'>Submit</button></form>")
res.sendFile(path.join(__dirname, '../views', 'product.html'))
})

//register a route: product
router.use("/product",(req,res,next)=>{
    console.log(req.body)
    // redirect to root: /
    res.redirect('/')
})

module.exports = router

