const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { userModel } = require("../models/userModel")
const userRouter = express.Router()
const { authorization } = require("../middlewares/authorization")


// register endpoint
userRouter.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, dob, bio } = req.body
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ 'error': err.message })
            } else {
                const isExisting = await userModel.findOne({ email })
                if (isExisting) {
                    res.send({ 'msg': 'User already exists, please login' })
                } else {
                    const user = new userModel({ name, email, password: hash, dob, bio })
                    await user.save()
                    res.status(201)
                    res.send({ 'msg': 'New user has been registered', 'UserID': user._id })
                }
            }
        })
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// login endpoint
userRouter.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.find({ email })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, hash) => {
                if (hash) {
                    let token = jwt.sign({ userID: user[0]._id }, process.env.secret)
                    res.status(201)
                    res.send({ 'msg': 'Logged in', 'token': token })
                } else {
                    res.send({ 'msg': 'Wrong password' })
                }
            })
        } else {
            res.send({ 'msg': "Wrong email address, please check the email you've entered" })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// all users endpoint
userRouter.get("/api/users", async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200)
        res.send({ 'msg': 'All registered users', 'Users': user })
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// all friends of a specific user
userRouter.get("/api/users/:id/friends", async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userModel.findById({ "_id": userId }).populate('friends')
        if (!user) {
            res.status(404)
            res.send({ 'error': 'User not found' })
        } else {
            res.status(200)
            res.send({ 'msg': `All friends of user: ${user._id}`, 'friends': user.friends })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// sending a friend request to another user 
userRouter.post("/api/users/:id/friends", authorization, async (req, res) => {
    try {
        const userId = req.params.id
        const friendID = req.body

        const user = await userModel.findById({ "_id": userId })
        if (user) {
            user.friendRequests.push(friendID)
            await user.save()

            res.status(200)
            res.send({ 'msg': 'Friend request sent successfully' })
        } else {
            res.status(404)
            res.send({ 'error': 'User not found' })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// accept or reject friend requests
userRouter.patch("/api/users/:id/friends/:friendId", authorization, async (req, res) => {
    try {
        const userId = req.params.id
        const friend = req.params.friendId

        const status = req.body
        const user = await userModel.findById({ "_id": userId })
        if (!user) {
            res.status(404)
            res.send({ 'error': 'User not found' })
        } else {
            const friendIndex = user.friendRequests.indexOf(friend)
            if (friendIndex === -1) {
                res.status(404)
                res.send({ 'error': 'Friend request not found, send the request again' })
            }
            if (status === 'accept') {
                user.friends.push(friend)
            }else{
                user.friendRequests.splice(friendIndex, 1);
                await user.save()
            }

            res.status(204)
            // res.send({'msg':`Your friend request has been ${status}ed`})
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})
module.exports = { userRouter }