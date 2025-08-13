import userModel from "../models/user.model.js"
import BuyerProfileModel from '../models/BuyerProfile.model.js'
import SupplierProfileModel from '../models/supplierProfile.model.js'
import { validationResult } from "express-validator"
import { sendMail } from "./email.controller.js"
import { generateOTP } from "../utils/generateOTP.js"
import { generateAccessAndRefereshTokens } from "../utils/generateAccessAndRefereshTokens.js"

export const signIn = async (req, res) => {
     try {
       const { email, password } = req.body
         
       let user = await userModel.findOne({ email })
       if (!user) return res.status(404).json({ error: "Invalid email or password."})

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(403).json({ error: "Invalid email or password."})
      }

       let profile;
        if (user.role === 'buyer') {
          profile = await BuyerProfileModel.findOne({ user: user._id });
        } else if (user.role === 'supplier') {
          profile = await SupplierProfileModel.findOne({ user: user._id });
        }

       const safeUser = {
      email: user.email,
      role: user.role,
      firstName: profile?.fullName?.firstName || '',
      lastName: profile?.fullName?.lastName || ''
      };

      const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);
       return res.status(200)
              .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
              })
              .json({ message: "Login successful", user: safeUser, accessToken, role: user.role });

     } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.'})
     }
}

export const register = async (req, res) => {

    const error = validationResult(req)
    if(!error.isEmpty())  return res.status(400).json({ error: "Error:" + error.array()})
         
    try {    
        const { email, role, password, firstName, lastName } = req.body;

        // Find is email Already exists
        let buyer = await userModel.findOne({ email })
        if(buyer) return res.status(404).json({ error: "Email already exists!"})
            
        const otp = generateOTP()
        await sendMail(email, otp)
        let createdUser = await userModel.create({
              fullName: { firstName, lastName },
              email,
              password,
              otp,
              role
          });
        
          if (role == 'buyer') {
            await BuyerProfileModel.create({
            user: createdUser._id,
            fullName: { firstName, lastName },
          });
        } else {
             await SupplierProfileModel.create({
               user: createdUser._id,
               fullName: { firstName, lastName },
            });
        }
           return res.status(201).json({ message: "User registered. Please verify your email."});
        
    } catch(error) {
         res.status(500).json({ error: "Something went wrong."});
    }
}

export const getProfile = async (req, res, next) => {
    res.status(200).json(req.buyer)

}

