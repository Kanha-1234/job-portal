import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobid = req.params.id;
    
    if(!jobid) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }
  //if the user has already applied for this job
    const existing_application = await Application.findOne({
      job: jobid,
      applicant: userId,
    });

    if(existing_application) {
      return res.status(400).json({
        message: "already applied for this job",
        success: false,
      });
    }

    //check if the job is exit or not
    const job = await Job.findById(jobid);
    if (!job) {
      return res.status(400).json({
        message: "current job not exit",
        success: false,
      });
    }

    //create anew application
    const newApplication = await Application.create({
      job: jobid,
      applicant: userId,
    });

    job.applications.push(newApplication);

    await job.save();

    return res.status(201).json({
      message: "new application created successfully",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//get all application

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "no applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//find get applicants id

export const getApplications = async (req, res) => {
  try {
    const jobid = req.params.id;

    const job = await Job.find({jobid}).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applications",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "no applications",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }
    //update status

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      application,
      message: "status updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
