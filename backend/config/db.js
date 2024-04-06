import  mongoose  from "mongoose";
const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log(`Successfully connected to mongodb`);
    }catch(error){
        console.error(`ERROR: ${error.message}`)
        process.exit(1)
    }
};

export default connectDB;