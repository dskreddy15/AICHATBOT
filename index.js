import express, { json } from 'express';
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

dotenv.config()
const app = express();

//Using middleware express json so the server could read  
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, (res) => {
    console.log(`server running on port ${process.env.PORT}`);
    connectDb();
});