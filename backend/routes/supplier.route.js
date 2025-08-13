import { Router } from 'express'
import { getProfile, updateProfile, addProduct, getProducts, deleteProduct,
        logoutSupplier
 } from '../controllers/supplier.controller.js'
import { supplierAuth } from '../middlewares/authMiddleware.js'
import { body, validationResult } from 'express-validator'
import upload from '../middlewares/cloudinaryUpload.js'
// import upload from '../middlewares/multer.js'



const router = Router()

 const validator = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
 

router.get('/profile', supplierAuth , getProfile)

router.put('/update-profile', supplierAuth, upload.single('avatar'), 
 [
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required'),

    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required'),

    body('email')
      .trim()
      .isEmail().withMessage('Valid email is required'),

    body('contact')
      .optional({ checkFalsy: true})
      .matches(/^[0-9]{10,15}$/).withMessage('Contact must be 10-15 digits'),
    body('address')
        .optional({ checkFalsy: true }),
    body('password')
      .optional({ checkFalsy: true})
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('description')
      .optional({ checkFalsy: true})
      .isLength({ max: 500 }).withMessage('Description too long (max 500 characters)')
  ],
  updateProfile
);

// Add Product
router.post('/add-product', supplierAuth,
  upload.array("images", 4),
  [
    body('title')
    .notEmpty()
    .withMessage('Product name is required'),
    body('price')
    .isNumeric()
    .withMessage('Price must be a number'),
    body('category')
    .notEmpty()
    .withMessage('Category is required')
  ],
  validator,
  (req, res, next) => {
    if (!req.files || req.files.length < 1) {
      return res.status(500).json({ error: 'At least 1 image is required.' });
    }
    next();
  },
  addProduct
);

// Get Products
router.get('/get-products', supplierAuth, getProducts);

// Delete Product
router.delete('/delete/:productId', supplierAuth, deleteProduct)

router.post('/logout', supplierAuth, logoutSupplier)

export default router