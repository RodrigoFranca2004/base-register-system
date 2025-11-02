import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('[DATABASE] MONGO_URI not defined in .env');
    process.exit(1); 
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('[DATABASE] Successfully connected into MongoDB!');
  } catch (error) {
    console.error('[DATABASE] Failed to connect into MongoDB:', error);
    process.exit(1); 
  }
};