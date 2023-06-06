const jwt = require("jsonwebtoken")
require("dotenv").config()
const authorization = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (decoded) {
                console.log(decoded.userID);
                req.body.userID = decoded.userID
                next()
            } else {
                res.send({ 'msg': 'Token expired, please login again' })
            }
        })
    } else {
        res.send({ 'msg': 'Session timed out, please login again' })
    }
}

module.exports = {authorization}