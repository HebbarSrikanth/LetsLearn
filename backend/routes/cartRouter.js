import express from 'express'
const router = express.Router()
import { addToCart, fetchCartItem } from '../controller/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id').get(protect, fetchCartItem).post(protect, addToCart)

export default router