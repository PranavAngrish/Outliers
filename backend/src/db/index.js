import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ! DB host`);


    }catch(error){
        console.log("MONGODB connection error: ",process.env.MONGODB_URI, error);
        process.exit(1)

    }
}
export default connectDB;