import { Router } from 'express'
import { refreshAccessToken } from '../controllers/refreshToken.controller.js'

const router = Router()

// Refresh the Access token
router.post('/token', refreshAccessToken);

export default router