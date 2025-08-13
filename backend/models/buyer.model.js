import mongoose from "mongoose";
import bcrypt from "bcrypt" 
import jwt from 'jsonwebtoken'

// create schema
const buyerSchema = new mongoose.Schema ({
      
      fullName: {
          firstName: {
            type: String,
            default: '',
            required: true
          },
          lastName: {
            type: String,
            default: '',
            required: true
          }
      },
      email: {
          type: String,
          required: true,
          unique: true,
          match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                 'Please fill a valid email address']
      },
       password: {
                type: String,
      },
       isVerified: { 
                type: Boolean,
                default: false,
      },
      otp : {
          type: Number,
          required: true
      },
      refreshToken: {
        type: String
      },
      createdAt: {
                type: Date,
                default: Date.now
            },

        },   {
           
        }, 
        { timestamps: true } 

)


// Password hashing middleware
buyerSchema.pre('save', async function(next){

       // Skip hashing if the password hasn't been modified
        if(!this.isModified('password')) return next();
        
        // Hash the Password
       await bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(this.password, salt)) // Hash password
        .then(hash => {
            this.password = hash; 
            next();
        })
        .catch(error => next(error));
})

// Compare password Hook
buyerSchema.methods.comparePassword = async function (password) {
           return await bcrypt.compare(password, this.password)
}

// Generate Access Token
buyerSchema.methods.generateAccessToken = function() {
       return jwt.sign(
        { email: this.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

// Generate Refearsh Token
buyerSchema.methods.generateRefreshToken = function() {
       return jwt.sign(
        {  email: this.email, }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};


export default mongoose.model('Buyer', buyerSchema)