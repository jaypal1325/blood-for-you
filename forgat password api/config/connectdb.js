import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTINS = {
            dbname: "geekshop"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTINS)
        console.log('Connected Successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB