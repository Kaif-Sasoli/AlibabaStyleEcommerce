import buyerModel from "../models/buyer.model.js";
import userModel from "../models/user.model.js";
import BuyerProfileModel from "../models/BuyerProfile.model.js";
import jwt from 'jsonwebtoken'


export const getProfile = async (req, res, next) => {
    try {
    const buyer = req.buyer;

    const profile = await BuyerProfileModel.findOne({ user: buyer._id });

    const safeBuyer = {
      email: buyer.email,
      role: buyer.role,
      firstName: profile?.fullName?.firstName || '',
      lastName: profile?.fullName?.lastName || ''
    };

    return res.status(200).json(safeBuyer);
  } catch (error) {
    console.error('Error in getProfile:', error);
    return res.status(500).json({ message: 'Something went wrong!' });
  }

}

export const refreshAccessToken = async (req, res) => {
    try {    
      const refreshToken  = req.cookies.refreshToken;
      console.log("I am hit Refresh", refreshToken)
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
      console.log(error)
        res.status(403).json({ error: 'Invalid or expired refresh token!' });
    }
}


export const logoutBuyer = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.buyer._id, { refreshToken: null });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false ,
      sameSite: 'lax',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

