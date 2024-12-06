import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js"
dotenv.config({})


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//routes
app.use("/api/v1/user",userRouter)

const PORT = process.env.PORT || 3030
app.listen(PORT,()=>{
    connectDB()
    console.log(`server listining on port ${PORT}`)
})