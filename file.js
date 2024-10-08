const fs = require('node:fs')

// create new file using writeFileSync, file_name, file_data
fs.writeFileSync('app.txt','hello, world!')

//read file -> returns raw data in hexadecimal ASCII format
console.log(fs.readFileSync('app.txt'))

// use .toSrting() to convert to string format
console.log(fs.readFileSync('app.txt').toString())


// appending to file
fs.appendFileSync('app.txt', 'how are you')