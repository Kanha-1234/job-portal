import express from "express";
import {registerCompany,getCompany,updateComapanyById, getCompanyByID,} from "../controller/company.controller.js"
import isAuthenticated from "../middlewares/isAutenticated.js";


const comapnyRouter = express.Router();
comapnyRouter.route('/register').post(isAuthenticated,registerCompany)
comapnyRouter.route('/get').get(isAuthenticated,getCompany)
comapnyRouter.route('/get/:id').get(isAuthenticated,getCompanyByID)
comapnyRouter.route('/update/:id').put(isAuthenticated,updateComapanyById)

export default comapnyRouter