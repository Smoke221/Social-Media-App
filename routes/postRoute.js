const express = require("express")
const { userModel } = require("../models/userModel")
const { postModel } = require("../models/postModel")
const postRouter = express.Router()
const { authorization } = require("../middlewares/authorization")

// all the posts
postRouter.get("/api/posts", async (req, res) => {
    try {
        const posts = await postModel.find()

        res.status(200)
        res.send({ 'msg': 'All the posts', 'posts': posts })
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// user can create a new post
postRouter.post("/api/posts", authorization, async (req, res) => {
    try {
        const { user, text, image } = req.body

        const post = new postModel({ user, text, image })
        await post.save()

        res.status(201)
        res.send({ 'msg': 'Post created successfully' })
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// updating the text or image for a specific post
postRouter.patch("/api/posts/:id", authorization, async (req, res) => {
    try {
        const postId = req.params.id
        const { text, image } = req.body

        const post = await postModel.findByIdAndUpdate({ "_id": postId }, { text, image })
        if (!post) {
            res.status(404)
            res.send({ 'error': 'Post not found' })
        } else {
            res.status(204)
            res.send({ 'msg': 'Updated the details of the post' })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// delete a specific post
postRouter.delete("/api/posts/:id", authorization, async (req, res) => {
    try {
        const postId = req.params.id

        const post = await postModel.findByIdAndDelete({ "_id": postId })
        if (!post) {
            res.status(404)
            res.send({ 'error': 'Post not found' })
        } else {
            res.status(202)
            res.send({ 'msg': 'Post deleted successfully' })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// like a post
postRouter.post("/api/posts/:id/like", authorization, async (req, res) => {
    try {
        const postId = req.params.id
        const { userId } = req.body

        const post = await postModel.findById({ "_id": postId })
        if (!post) {
            res.status(404)
            res.send({ 'error': 'Post not found' })
        } else {
            post.likes.push(userId)
            await post.save()

            res.status(201)
            res.send({ 'msg': 'Post liked successfully' })
        }

    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// comment on a specific post
postRouter.post("/api/posts/:id/comment", authorization, async (req, res) => {
    try {
        const postId = req.params.id
        const { userId, text } = req.body

        const post = await postModel.findById({ "_id": postId })
        if (!post) {
            res.status(404)
            res.send({ 'error': 'Post not found' })
        } else {
            const comment = {
                user: userId,
                text
            }
            post.comments.push(comment)
            await post.save()

            res.status(201)
            res.send({ 'msg': 'Commented on a post successfully' })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})

// details of a specific post
postRouter.get("/api/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id
        const post = await postModel.findById({ "_id": postId })

        if (!post) {
            res.status(404)
            res.send({ 'error': 'Post not found' })
        } else {
            res.status(200)
            res.send({ 'msg': 'Details of the post','post':post })
        }
    }
    catch (error) {
        res.status(400)
        res.send({ 'msg': 'Something went wrong', 'error': error.message })
    }
})
module.exports = { postRouter }