// import express library
const express = require('express')
const path = require('node:path')

const shopRouter = require('./router/shop')
const productRouter = require('./router/product')

//initialise to a constant
const app = express();

//init port for listening
app.listen(3000)

// use urlencoded to parse incoming request
app.use(express.urlencoded({extended:true}))

app.use(productRouter)
app.use(shopRouter)