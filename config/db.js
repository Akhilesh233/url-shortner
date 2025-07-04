import mongoose from "mongoose";
import config from "config";

const db = config.get('mongoUrl');

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;