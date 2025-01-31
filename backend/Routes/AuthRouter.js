const express = require('express')
const router = express.Router()

const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js')
const { signupController, loginController } = require('../Controllers/AuthController.js')

router.post('/login', loginValidation, loginController)
router.post('/signup', signupValidation, signupController)

module.exports = router

