import mongoose from "mongoose";

const supplierProfileSchema = new mongoose.Schema({
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
      contact : {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
          },
      company : {
        type: String,
        default: 'ShopNest Trading LLC'
      },
      description: {
        type: String,
        default: ''
      }
});

export default mongoose.model('SupplierProfile', supplierProfileSchema);