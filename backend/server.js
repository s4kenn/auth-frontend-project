const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const connectToDB = require('./Database/db.js')
const AuthRouter = require('./Routes/AuthRouter.js')
const ProductRouter = require('./Routes/ProductRouter.js')

connectToDB()
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products',ProductRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})