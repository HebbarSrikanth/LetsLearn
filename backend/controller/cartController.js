import Cart from '../model/cartModal.js'
import asyncHandler from 'express-async-handler'

export const fetchCartItem = asyncHandler(async (req, res) => {
    const cartItems = await Cart.find({ user: req.params.id })
    if (cartItems) {
        res.json(cartItems)
    } else {
        res.json({ "message": "No Items present currently" })
    }
})

export const addToCart = asyncHandler(async (req, res) => {
    try {
        console.log('In Add to cart')
        const itemExists = await Cart.find({ product: req.body.product })
        if (itemExists.length === 0) {
            console.log('Not exists')
            const item = new Cart({
                name: req.body.name,
                image: req.body.image,
                user: req.user._id,
                product: req.body.product,
                price: req.body.price,
                countInStock: req.body.countInStock,
                qty: req.body.qty
            })
            const insertedItem = await item.save()
            res.status(201).json(insertedItem)
        } else {
            console.log('Already Exists')
            const value = await Cart.findOneAndUpdate({ product: req.body.product }, { qty: req.body.qty })
            res.status(201).json(value)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": `Error due to ${err}` })
    }
})

export const deleteFromCart = asyncHandler(async (req, res) => {
    try {
        const value = await Cart.findOneAndDelete({
            $and: [{ product: req.params.product }, { user: req.user._id }]
        })
        res.json(value)
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": `Error due to ${err}` })
    }
})