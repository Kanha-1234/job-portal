import express from "express";

import isAuthenticated from "../middlewares/isAutenticated.js";
import { applyJob, getApplications, getAppliedJob, updateStatus } from "../controller/application.controller.js";


const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").get(isAuthenticated,applyJob)
applicationRouter.route("/get").get(isAuthenticated,getAppliedJob)
applicationRouter.route("/:id/applicants").get(isAuthenticated,getApplications)
applicationRouter.route("/status/:id/update").post(isAuthenticated,updateStatus)

export default applicationRouter