import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import comapnyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
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
app.use("/api/v1/company",comapnyRouter);
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)

const PORT = process.env.PORT || 3030
app.listen(PORT,()=>{
    connectDB()
    console.log(`server listining on port ${PORT}`)
})