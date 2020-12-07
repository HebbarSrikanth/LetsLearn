import express from 'express'
const router = express.Router()
import { addToCart, fetchCartItem, deleteFromCart } from '../controller/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id').get(protect, fetchCartItem).post(protect, addToCart)
router.route('/:product').delete(protect, deleteFromCart)

export default router