
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
//    await client.db("admin").command({ ping: 1 });
//    console.log("Pinged your deployment. You successfully connected to MongoDB!");
//    const db = client.db('test')
//    db.collection('users').insertOne({
//      name: 'gautham',
//      age: 28,
//
//    }).then(res => console.log(res)).catch(e => console.log(e))

//    await client.db('project0').collection('users').insertOne({
//      name: 'gpg',dob: 96
//    })
//
//    await client.db("project0").collection("users").insertMany([{name: "abc", dob: 45}, {value: 'cd',dobds:23}]).then(res=>console.log(res)).catch(e=>console.log(e))

//await client.db("project0").collection("users").findOne({}).then((res)=>{console.log(res)}).catch((e)=>console.log(e))
//await client.db("project0").collection("users").find({dob: 45}).toArray().then((res)=>{console.log(res)}).then((e)=>console.log(e))

//await client.db("project0").collection("users").updateOne(
//  {dob:45},{
//    $set:{
//      dob: 32
//    }
//  }
//).then((res)=>console.log(res)).catch((e)=>{conso.e.log(e)})
//await client.db("project0").collection("users").updateMany(
//  {},{
//    $inc:{
//      dob: 11
//    }
//  }
//).then((res)=>console.log(res)).catch((e)=>{console.log(e)})
await client.db("project0").collection("users").deleteMany({dob: 56
  }
).then((res)=>console.log(res)).catch((e)=>{console.log(e)})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


//const mongodb = require('mongodb')
//const mongoClient = mongodb.MongoClient
//const url = 'mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//
//mongoClient.connect(url,(error, client)=>{
//  if(error){
//    return
//  }
//  console.log(client)
//})

//const client = new MongoClient(uri)
//
//async function run(){
//  try{
//    await client.connect()
//    console.log("connected successfully")
//  }finally{
//    await client.close()
//  }
//}
//run().catch(console.dir)