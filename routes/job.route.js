import express from "express";

import isAuthenticated from "../middlewares/isAutenticated.js";
import { getAdminJobs, getAllJob, getJobById, postJob } from "../controller/job.controller.js";


const jobRouter = express.Router();


jobRouter.route('/post').post(isAuthenticated,postJob)
jobRouter.route('/getalljobs').get(isAuthenticated,getAllJob)
jobRouter.route('/getadminjobs').get(isAuthenticated,getAdminJobs)
jobRouter.route('/get/:id').get(isAuthenticated,getJobById)

export default jobRouter