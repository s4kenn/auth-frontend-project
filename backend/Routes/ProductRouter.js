const express = require('express')
const router = express.Router()
const authMiddleware = require('../Middlewares/AuthMiddleware.js')
const products = [
    {
        "name": "Daaldo",
        "price": 10.99
    }, {
        "name": "Corn Cassette",
        "price": 9.99
    }
]

router.get('/get', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        data: products
    })
})

module.exports = router