const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectToDB = require('./Database/db.js')

connectToDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})