import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const refreshAccessToken = async (req, res) => {
    try {    
      const refreshToken  = req.cookies.refreshToken;
      if(!refreshToken) return res.status(401).json({ error: "Access Denied!" });

      const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET)

      const checkBuyer = await userModel.findOne({ email: decodedToken.email });

      if(!checkBuyer || checkBuyer.refreshToken !== refreshToken){
        return res.status(403).json({ error: 'Invalid refresh token!' });
      }

      // Generate new access token
      const newAccessToken = checkBuyer.generateAccessToken();

       res.status(200)
       .cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, sameSite: 'lax' })
       .json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired refresh token!' });
    }
}
