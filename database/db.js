import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(process.env.db_url,{
            dbName: "AIChatbot"
        });
        console.log("Connected Database");
    } catch (err) {
        console.log(err);
    }
}

export default connectDb;