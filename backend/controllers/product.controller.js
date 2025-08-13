import productModel from '../models/product.model.js'
import supplierProfileModel from '../models/supplierProfile.model.js';
import productCategoryModel from '../models/productCategory.model.js';

function shortenTitle(title, maxWords = 4) {
  const words = title.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ');
  }
  return title;
}


export const getCategories = async (req, res) => {
    try {
         const categories = await productCategoryModel.find({}, { _id: 1, name: 1 }).lean();
          return res.status(200).json({ data: categories, });

    } catch (error) {
         return res.status(500).json({ error: 'Something went wrong!' })
    }
}

export const getRecommendedNewProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

      const recommendedProducts = await productModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("_id title price images");

       const modifiedProducts = recommendedProducts.map(prod => ({
      _id: prod._id,
      title: shortenTitle(prod.title, 4), 
      price: prod.price,
      images: prod.images,
    }));
        
    res.status(200).json({ recommendedProducts: modifiedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommended products" });
  }
};

export const getElectronicProducts = async (req, res) => {
  try {
    
    const category = await productCategoryModel.findOne({ name: { $regex: /^electronics?$/i } });
    if (!category) return res.status(200).json({ products: [] });
    
     const electronicProducts = await productModel.aggregate([
      { $match: { category: category._id } },
      { $sample: { size: 8 } },
      { $project: { _id: 1, title: 1, price: 1, images: 1 } }
    ]);

    const modifiedProducts = electronicProducts.map(prod => ({
      _id: prod._id,
      title: shortenTitle(prod.title, 2),
      price: prod.price,
      images: prod.images,
    }));

    return res.status(200).json({ products: modifiedProducts });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch electronic products" });
  }
};


export const productDetail = async (req, res) => {
    try {
        
      const { productId } = req.params; 
      const product = await productModel.findById(productId)
           .populate({
             path: "supplier",
             model: "SupplierProfile",
             populate: {
               path: "user", 
               select: "email username"
             }
      }).populate({
        path: "category",
        model: "Category",
        select: "name" 
      })
      .lean(); 

       return res.status(201).json({ productInfo: product })
    } catch (error) {
       return res.status(500).json({ error:  "Failed to fetch product details." })
    }
}

export const relatedProducts = async (req, res) => {
  try {
    
    const relatedProducts = await productModel.aggregate([
      { $sample: { size: await productModel.countDocuments() } },
      { $project: { _id: 1, title: 1, price: 1, images: 1 } }
    ]);

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return res.status(500).json({ error: "Failed to fetch product." });
  }
};

  // export const searchProducts = async (req, res) => {
  //   try {
  //     const { 
  //       q, 
  //       category, 
  //       minPrice, 
  //       maxPrice, 
  //       page = 1, 
  //       limit = 10, 
  //       sort = "createdAt" 
  //     } = req.query;
    
  //     const filters = {};
    
  //     // Search by keyword (title or description)
  //     if (q) {
  //       filters.$or = [
  //         { title: { $regex: q, $options: "i" } },
  //         { description: { $regex: q, $options: "i" } }
  //       ];
  //     }
    
  //     // Filter by category
  //     if (category) {
  //       filters.category = category; 
  //     }
    
  //     // Price filter
  //     if (minPrice || maxPrice) {
  //       filters.price = {};
  //       if (minPrice) filters.price.$gte = Number(minPrice);
  //       if (maxPrice) filters.price.$lte = Number(maxPrice);
  //     }
    
  //     // Pagination math
  //     const skip = (Number(page) - 1) * Number(limit);
    
  //     // Query DB
  //     const products = await productModel
  //       .find(filters)
  //       .sort({ [sort]: 1 })
  //       .skip(skip)
  //       .limit(Number(limit))
  //       .populate("category", "name") 
  //       .populate("supplier", "companyName");
    
  //     const total = await productModel.countDocuments(filters);
    
  //     res.status(200).json({
  //       products,
  //       pagination: {
  //         total,
  //         page: Number(page),
  //         pages: Math.ceil(total / limit)
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Server Error" });
  //   }
  // };

  export const searchProducts = async (req, res) => {
    try {
      let { 
        q, 
        category, 
        minPrice, 
        maxPrice, 
        page = 1, 
        limit = 10, 
        sort = "createdAt",
        order = "desc"
      } = req.query;

      page = Number(page) || 1;
      limit = Number(limit) || 10;

      const filters = {};

      // Efficient text search if q is present
      if (q) {
        filters.$text = { $search: q };
      }

      if (category) {
        filters.category = category;
      }

      // Price filter
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }

      const skip = (page - 1) * limit;

      const sortOrder = order === "asc" ? 1 : -1;
      const sortOptions = { [sort]: sortOrder };
      // images: { $slice: 1 },

       const products = await productModel.aggregate([
      { $match: filters },
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          price: 1,
          images: 1,
          stars: 1,
          rating: 1,
          totalOrders: 1,
          freeShipping: 1,
          description: 1,
          discount: 1,
          category: 1,
          reviewCount: { $size: { $ifNull: ["$reviews", []] } }
        }
      },
      // Populate category name
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "supplierprofiles",
          localField: "supplier",
          foreignField: "_id",
          as: "supplier"
        }
      },
      { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: true } }
    ]);

      const total = await productModel.countDocuments(filters);

      res.status(200).json({
        success: true,
        products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit
        }
      });
    } catch (error) {
      console.error("Error in searchProducts:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
