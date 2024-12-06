import express from "express";
import { login, logout, register, updateProfile } from "../controller/user.controller.js";



const userRouter = express.Router();
userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)
userRouter.route('/update/profile').post(updateProfile)

