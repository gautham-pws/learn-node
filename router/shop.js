const express = require('express')
const router = express.Router()
const path = require('node:path')

//register route: / which is default
router.use((req,res,next)=>{
    console.log("second middleware")
    //response is a hello message
//    res.send("<h1>Hello, from express js </h1>")
res.sendFile(path.join(__dirname, '../views', 'shop.html'))

})

module.exports = router

