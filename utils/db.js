const mongoose = require("mongoose")
const validator = require("validator")
const uri = "mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/project0?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		required: true,
		validate(value) {
			if (value < 1) {
				throw new Error("Sorry, you're too young!")
			}
		}
	},
	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email!")
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 3
	}
})


const User = mongoose.model('User', userSchema)

const user1 = new User({
	name: "gpg", age: 233, email: "gautham@gmail.com", password: "123"
})

user1.save().then((a) => console.log(a)).then((e) => console.log(e))