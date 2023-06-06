const mongoose = require("mongoose")
const { userModel } = require("./userModel")

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
        text: String,
        createdAt: Date
    }]
})

const postModel = mongoose.model("post", postSchema)
module.exports = { postModel }

// {
//     "user":"647edd8f02306bb1ddf9ce81",
//     "text":"King getting ready for WTC final which is happening tomorrow",
//     "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGrhRko6jlEvn7iSDUgELs5KHzVdv5nXmBg&usqp=CAU"
//   }