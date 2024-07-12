import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
    if (isConnected) {
        console.log(`DB Connected already`);
        return;
    }
    try {
        console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);
        await mongoose.connect(process.env.MONGO_DB_URI || "");
        isConnected = true;
        console.log('Database connected successfully');
    } catch (err: any) {
        console.log("Error while connecting to DB:", err);
    }
}
