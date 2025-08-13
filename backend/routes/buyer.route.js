import { Router } from 'express'
import { refreshAccessToken, getProfile, logoutBuyer } from '../controllers/buyer.controller.js'
import { buyerAuth } from '../middlewares/authMiddleware.js'

const router = Router()



router.get('/profile', buyerAuth , getProfile)

// Refresh the Access token
router.post('/refresh-token', refreshAccessToken);

router.post('/logout', buyerAuth, logoutBuyer)


export default router