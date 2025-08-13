//*******     Email Controller ***********/
import transporter from '../config/emailConfig.js'
import UserModel from '../models/user.model.js'
import { generateOTP } from '../utils/generateOTP.js'
import BuyerProfile from '../models/BuyerProfile.model.js'
import SupplierProfile from '../models/supplierProfile.model.js'
import { emailVerificationTemplate } from '../public/views/emailTemplete.js'
import { generateAccessAndRefereshTokens } from '../utils/generateAccessAndRefereshTokens.js'


export const sendMail = async (email, otp) => {
    try{
    const info =  await transporter.sendMail({
    from: '"AlibabaStyleEcommerce" <kaifbrahui9@gmail.com>', 
    to: email, 
    subject: "Verify your Email", 
    text:  `Your OTP is: ${otp}`, 
    html: emailVerificationTemplate(otp), 
    })
      return "Email sent successfully"

  } catch(error){
     throw new Error("Couldn't send mail: " + error.message)
  }

}


export const verifyEmail = async (req, res) => { 
     try {

       const { email, otp } = req.body
       // Find buyer
       let user = await UserModel.findOne({ email });

       if (!user) return res.status(404).json({ error: "User not found." });
      //  if (user.isVerified) return res.status(400).json({ error: "Email already verified." });
       if (user.otp !== Number(otp))  return res.status(401).json({ error: "Invalid OTP." });

      
      user.isVerified = true;
      await user.save();

      let profile;
      if (user.role === 'buyer') {
        profile = await BuyerProfile.findOne({ user: user._id });
      } else if (user.role === 'supplier') {
        profile = await SupplierProfile.findOne({ user: user._id });
      }

      const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);
      const safeUser = {
      email: user.email,
      role: user.role,
      firstName: profile?.fullName?.firstName || '',
      lastName: profile?.fullName?.lastName || ''
      };

      return res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax'
        })
        .status(200)
        .json({ message: "Email verified", user: safeUser, accessToken, role: user.role });

     } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong."});
     }
}

// Resend OTP to the buyer
export const resendOTP = async (req, res) => {
  try {
      let { email } = req.body

      let user = await UserModel.findOne({ email });
      if (!user){ return res.status(404).json({ error: "User not found" });}

      const otp = generateOTP()
      await sendMail(email, otp)
      user.otp = otp;
      await user.save()

      return res.status(200).json({message: "A new OTP has been sent to your email address."})

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong. Please try again later."});
  }

}