import { Router } from 'express'
import { body }  from 'express-validator'
import { addToCart, getCartItems, removeFromCart } from '../controllers/cart.controller.js'
import { buyerAuth } from '../middlewares/authMiddleware.js'


const router = Router()

router.post('/add', buyerAuth, addToCart)


router.delete("/remove", buyerAuth, removeFromCart);

router.get('/items', buyerAuth, getCartItems);

export default router