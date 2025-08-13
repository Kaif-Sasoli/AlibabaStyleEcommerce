import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
     },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    },
    comment: { 
        type: String, 
        default: "" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now },
  },
  { _id: false }
);

export default reviewSchema;
