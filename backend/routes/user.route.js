import { Router } from 'express'
import { body }  from 'express-validator'
import { signIn, register } from '../controllers/auth.controller.js'
import { verifyEmail, resendOTP } from '../controllers/email.controller.js'


const router = Router()

router.post('/register', register)

// Sign in
router.post('/signin', 
    [
        body('email')
        .isEmail()
        .withMessage('Invalid email address'),
        body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
        
    ], signIn
)


// Verify email
router.post('/verify-email', 
      [
        body('email')
        .isEmail()
        .withMessage('Invalid email address'),
        body('otp')
        .isLength({ min: 5 })
        .withMessage('OTP must be at least 5 characters long'),
      ],
      verifyEmail
)

// Resend otp
router.post('/resend-email', 
        [
            body('email')
            .isEmail()
            .withMessage('Invalid email address'),
        ],
        resendOTP
    )

export default router