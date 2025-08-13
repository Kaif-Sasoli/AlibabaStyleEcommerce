import supplierProfileModel from "../models/supplierProfile.model.js";
import productModel from '../models/product.model.js'
import userModel from '../models/user.model.js'
import { validationResult } from 'express-validator';
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const getProfile = async (req, res, next) => {
    try {
    const supplier = req.supplier;

    const profile = await supplierProfileModel.findOne({ user: supplier._id });

    const safesupplier = {
      avatar: supplier.avatar,
      email: supplier.email,
      role: supplier.role,
      firstName: profile?.fullName?.firstName || '',
      lastName: profile?.fullName?.lastName || '',
      address : profile?.address || '',
      contact: profile?.contact || '',
      description: profile?.description || ''

    };
    return res.status(200).json(safesupplier);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }

}

export const updateProfile = async (req, res, next) => {

     try {
        const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }

      const supplierId = req.supplier._id; 
      const { firstName, lastName, email, contact, password, description, address } = req.body;
      const avatarUrl = req.file?.path || null;

      const userData = {};
      if (email) userData.email = email;
      if (avatarUrl) userData.avatar = avatarUrl;
      if (password) {
        userData.password = await bcrypt.hash(password, 10);
      }
      
      const updatedUser = await userModel.findByIdAndUpdate(supplierId, userData);
      const updatedProfile = await supplierProfileModel.findOneAndUpdate(
      { user: supplierId },
      {
        fullName: { firstName, lastName },
        contact,
        address,
        description
      },
      { upsert: true } 
    );

    const responseData = {
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
      firstName: updatedProfile?.fullName?.firstName || '',
      lastName: updatedProfile?.fullName?.lastName || '',
      contact: updatedProfile?.contact || '',
      address: updatedProfile?.address || '',
      description: updatedProfile?.description || '',
    };
      res.status(200)
         .json({ message: "Profile updated", supplier: responseData });


    } catch (error) {
      next(error);
    }
}


// Add Product
export const addProduct = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path); 
        const { title, category, description, price, quantity, discount,
                freeShipping, material, warranty, condition } = req.body

        const supplierProfile = await supplierProfileModel.findOne({ user: req.supplier._id });
        const product = await productModel.create({
             supplier: supplierProfile._id,
             title,
             category,
             description,
             price,
             quantity,
             discount,
             freeShipping,
             condition,
             material, 
             warranty,
             images: imageUrls,

        })
         return res.status(201).json({
          message: "Product created successfully",
          product,
        });

         } catch (error) {
         return res.status(500).json({ error: "Something went wrong!" });   
        }
}

// getProducts
export const getProducts = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const supplierProfile = await supplierProfileModel.findOne({ user: req.supplier._id });

      const totalProducts = await productModel.countDocuments({ supplier: supplierProfile._id });

      const products = await productModel
      .find({ supplier: supplierProfile._id })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

      return res.status(200).json({
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
    });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong while fetching products" });
  }

}

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

   const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};


export const logoutSupplier = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.supplier._id, { refreshToken: null });

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