import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('🛢️  Database is connected!');
  } catch (error) {
    console.log('MONGODB connection FAILED:', error);
    throw error; 
  }
};