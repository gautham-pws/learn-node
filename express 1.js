// import express library
const express = require('express')
const path = require('node:path')
//initialise to a constant
const app = express();

//init port for listening
app.listen(3000)

// use urlended to parse incoming request
app.use(express.urlencoded({extended:true}))

// register a route: add-product
app.use("/add-product",(req,res,next)=>{
    console.log("first middleware")
    //define respsonse, here a form which calls /product route
//    res.send("<form action='product' method='post'><input type='text' name='title'/><button type='submit'>Submit</button></form>")
res.sendFile(path.join(__dirname, 'views', 'product.html'))
})

//register a route: product
app.use("/product",(req,res,next)=>{
    console.log(req.body)
    // redirect to root: /
    res.redirect('/')
})

//register route: / which is default
app.use((req,res,next)=>{
    console.log("second middleware")
    //response is a hello message
//    res.send("<h1>Hello, from express js </h1>")
res.sendFile(path.join(__dirname, 'views', 'shop.html'))

})
