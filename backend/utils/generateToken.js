// Generate a Token
import JWT from 'jsonwebtoken'

export const generateToken = (user) => {
     return JWT.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET, 
        {expiresIn: '1d'})
}