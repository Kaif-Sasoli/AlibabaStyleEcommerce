import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const buyerAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
        if(!token) return res.status(401).json({ error: "You need to login first!" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email }).select(' -password -refreshToken ');

        
        if (!user || user.role !== 'buyer') {
          return res.status(403).json({ error: 'Access denied. Not a buyer.' });
        }

        req.buyer = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: "Access token expired" });
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: "Invalid token" });
        }
    return res.status(500).json({ error: "Something went wrong!" });
  }
}


export const supplierAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
        if(!token) return res.status(401).json({ error: "You need to login first!" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email }).select(' -password -refreshToken ');
        
        
        if (!user || user.role !== 'supplier') {
          return res.status(403).json({ error: 'Access denied. Not a Supplier.' });
        }

        req.supplier = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: "Access token expired" });
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: "Invalid token" });
        }
    return res.status(500).json({ error: "Something went wrong!" });
  }
}





