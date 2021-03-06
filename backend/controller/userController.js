import User from '../model/userModel.js'
//import Order from '../model/orderModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utilities/generateToken.js'

// @DESC Authenticate the login of the user
// @route POST /user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    console.log('Login Request')
    const { email, password } = req.body

    //Check if the user with the specified email Id is present 
    const user = await User.findOne({ email })

    //matchPassword method is written userModel
    if (user && await user.matchPassword(password)) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid user name or password')
    }

})

// @DESC Fetch the user profile , before that whether it has a proper valid token
// @route GET /user/profile
// @access Private
const fetchUserProfile = asyncHandler(async (req, res) => {
    console.log('User Profile request called')
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found!!')
    }
})

// @DESC Register New User
// @route GET /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    console.log("Called for Register request")
    const { name, email, password, phone } = req.body

    //Check whether the user has already registered
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Create a user or add a user
    const user = await User.create({
        name, email, password, phone
    })

    //If the user is created properly send a status i.e 201 specifing everything is fine
    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }


})

const updateProfileDetails = asyncHandler(async (req, res) => {
    console.log('Called for profile update')
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        if (req.body.password) {
            user.password = req.user.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found!!!')
    }
})


// @DESC Fecth all the order details of the user
// @route GET /user/myorders
// @access Private
// const fetchUserOrders = asyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id })
//     res.json(orders)
// })

export { fetchUserProfile, authUser, registerUser, updateProfileDetails }