const mongoose = require("mongoose")
const uri = "mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/project0?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		require: true,
		trim: true
	},
	age: {
		type: Number,
		require: true,

	}
})


const User = mongoose.model('User', userSchema)


const user1 = new User({
	name: "epicG", age: 72
})

user1.save().then((a) => console.log(a)).then((e) => console.log(e))