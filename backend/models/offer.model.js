import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    discountPercentage: { 
        type: Number, 
        min: 0 
    },
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

export default offerSchema;