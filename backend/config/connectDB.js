import mongoose from "mongoose";

const connectDatabase = process.env.MONGODB;

const connectDB = async () => {
    await mongoose.connect(connectDatabase);
}

connectDB().then(()=>{
    console.log("Database Connected!");
    
}).catch((error)=>{
    console.log("Database is not conneted!", error);
    
});

export default connectDB;