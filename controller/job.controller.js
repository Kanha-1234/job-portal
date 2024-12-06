import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;
    
    if (
      !title ||
      !description ||
     !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary:Number(salary),
      location,
      jobType,
      experienceLavel:experience,
      position,
      company:companyId,
      created_by:userId
    });

    return res.status(201).json({
        message:"new job created",
        success:true,
        job
    })
  } catch (err) {
    console.log(err);
  }
};


//get all job
export const getAllJob = async(req,res)=>{

     try{
       const keyword = req.query.keyword || "";

       const query = {
        $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
        ]
       };

       const jobs = await Job.find(query).populate({
        path:"company"
       }).sort({createdAt:-1})
      
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })




     }
     catch(err){
        console.log(err)
     }
}

//const get job by id

export const getJobById = async(req,res)=>{
    try{
       const jobId = req.params.id;
       const job = await Job.findById(jobId)

       if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
       }

       return res.status(200).json({
        job,
        success:true
    })

    }
    catch(err){
        console.log(err)
    }
}

//admin job search by creation
export const getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(err){
        console.log(err)
    }
}