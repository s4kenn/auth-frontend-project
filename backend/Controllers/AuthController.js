const User = require('../Models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupController = async (req, res) => {

    try {

        const { name, email, password } = req.body
        // Check if user already exists
        const checkIfUserAlreadyExists = await User.findOne({ email })
        if (checkIfUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // Create hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        })


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }

}

const loginController = async (req, res) => {

    try {

        const { email, password } = req.body

        // check if user exists
        const getUser = await User.findOne({ email })
        if (!getUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Compare saved password with entered password
        const checkValidPassword = await bcrypt.compare(password, getUser.password)
        if (!checkValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        // Generate a token use JWT
        const token = jwt.sign({
            email: getUser.email,
            _id: getUser._id,
            name: getUser.name
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        })

        // Return token to frontend 
        return res.status(200).json({
            success: true,
            message: `Logged in successfully`,
            jwtToken: token,
            email: getUser.email,
            name: getUser.name
        })


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }

}

module.exports = { signupController, loginController }