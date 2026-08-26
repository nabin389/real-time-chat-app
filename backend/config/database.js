import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({});
const connectDB = async()=>{
    console.log("Here it is")
    try{
        await mongoose.connect(process.env.URI)
        console.log("connected to mongodb database")
    }
    catch(error){
        console.log("Error occured: ",error);
    }

}

export default connectDB;