const express = require("express")
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/userRoutes")
const { postRouter } = require("./routes/postRoute")

require("dotenv").config()
const app = express()
app.use(express.json())

app.get("/", (req,res) => {
    res.send({'msg':'Server is working'})
})

app.use("/user", userRouter)
app.use("/post",postRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to database');
    }
    catch (error) {
        console.log(error.message);
    }
    console.log(`App is connected to port ${process.env.port}`);
})