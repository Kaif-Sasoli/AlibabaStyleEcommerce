import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import upload from '../middlewares/cloudinaryUpload.js'
import { getCategories, getRecommendedNewProducts, getElectronicProducts,
        productDetail, relatedProducts, searchProducts
 }
 from '../controllers/product.controller.js'

  const validator = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
 
const router = Router()

router.get('/categories', getCategories)

// Recommended Products
router.get("/recommended", getRecommendedNewProducts );

// Product Electronic
router.get('/electronics-products', getElectronicProducts)

// Product Details
router.get('/detail/:productId', productDetail)

// Related Products
router.get('/related', relatedProducts)

// Search 
router.get('/search', searchProducts);


export default router

