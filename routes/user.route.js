import express from "express";
import { login, logout, register, updateProfile } from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAutenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const userRouter = express.Router();
userRouter.route('/register').post(singleUpload,register)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)
userRouter.route('/update/profile').post(isAuthenticated,updateProfile)

export default userRouter