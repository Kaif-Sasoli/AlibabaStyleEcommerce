// Buyer Schema
import mongoose from "mongoose";

const buyerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
});

export default mongoose.model('BuyerProfile', buyerProfileSchema);

