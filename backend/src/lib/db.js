import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) throw new Error("MONGO_URI is not set!");
        
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB successfully!");
    } catch (error) {
        console.error("Error in connection!");
        process.exit(1); 
    }
}