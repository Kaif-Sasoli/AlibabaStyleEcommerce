import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/dbConnection.js'
import buyerRouter from './routes/buyer.route.js'
import userRouter from './routes/user.route.js'
import supplierRouter from './routes/supplier.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import refreshTokenRouter from './routes/refreshToken.route.js'
import productCategoryModel from './models/productCategory.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
dotenv.config()

const allowedOrigins = [process.env.ORIGIN, process.env.LOCAL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

// Connect Database
await connectDB()

app.use('/user', userRouter)
app.use('/buyer', buyerRouter)
app.use('/supplier', supplierRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/refresh', refreshTokenRouter)

app.get('/', (req, res) => {
  res.send('Backend is working!');
});



app.get('/seed-categories', async (req, res) => {
  try {

    const categories = [
      "Electronics",
      "Mobiles and Tablets",
      "Laptops and Computers",
      "Cameras and Photography",
      "Home Appliances",
      "Fashion and Clothing",
      "Shoes and Footwear",
      "Watches and Accessories",
      "Beauty and Personal Care",
      "Sports and Fitness",
      "Books and Stationery",
      "Toys and Games",
      "Groceries and Food",
      "Furniture and Home Decor",
      "Automotive and Tools"
    ];

    // Prepare docs with slug
    const categoryDocs = categories.map(name => ({
      name: name.trim(),
      slug: name
        .toLowerCase()
        .replace(/&/g, 'and')     
        .replace(/\s+/g, '-')        
    }));

    // Insert only if not already existing
    const inserted = await productCategoryModel.insertMany(categoryDocs, { ordered: false });

    res.status(200).json({
      message: "Categories Seeded Successfully",
      categories: inserted
    });
  } catch (error) {
    // Duplicate category insertion will throw error, but we can handle it
    if (error.writeErrors) {
      return res.status(200).json({
        message: "Some categories already exist, others added.",
        error: error.writeErrors.map(e => e.errmsg)
      });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



export default app