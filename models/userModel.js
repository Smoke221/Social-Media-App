const mongoose = require("mongoose")
const { postModel } = require("./postModel")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: postModel }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
})

const userModel = mongoose.model("user", userSchema)
module.exports = { userModel }

// {
//     "name": "Vanitha",
//     "email": "vani@gmail.com",
//     "password": "vani",
//     "dob": "1997-10-19",
//     "bio": "Dad's little princess"
//   }