import mongoose from "mongoose";
import reviewSchema from "./review.model.js";
import offerSchema from "./offer.model.js";

const productSchema = new mongoose.Schema({
      supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "SupplierProfile", 
        required: true
    },
     category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",    
        index: true 
    },
      title: { 
        type: String, 
        required: true, 
        index: true 
    },
      description: { 
        type: String, 
        default: "" 
      },
      price: { 
        type: Number, 
        required: true 
     },
      discount: { 
        type: Number, 
        min: 0, 
        default: 0 
    },
      totalOrders: { 
        type: Number, 
        default: 0 
    },
      stars: { 
        type: Number,
         min: 0, 
         max: 5, 
         default: 0 
        },
      freeShipping: { 
        type: Boolean, 
        default: false 
    },
      fav: { 
        type: Boolean, 
        default: false 
    }, 
      warranty: { 
        type: String, 
        default: "" 
    },
      material: { 
        type: String, 
        default: "" 
    },
      condition: { 
        type: String, 
        enum: ["new", "used", "refurbished"], 
        default: "new" 
    },
      quantity: { 
        type: Number, 
        default: 0 
    },
      images: [{ type: String }], 
      offers: [offerSchema],
      reviews: [reviewSchema],
    
    }, { timestamps: true });

// Indexes for scalability
productSchema.index({ title: "text", description: "text" }); 
productSchema.index({ category: 1, price: 1 }); 

export default mongoose.model("Product", productSchema);