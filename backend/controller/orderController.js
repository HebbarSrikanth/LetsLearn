import Order from '../model/orderModel.js'
import asyncHandler from 'express-async-handler'

// @DESC Create a new Order request
// @route POST orders
// @access Protected
const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod, shippingPrice,
        taxPrice, totalPrice
    } = req.body

    if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export { addOrder }