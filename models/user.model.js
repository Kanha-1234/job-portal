import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    
    },
    email: {
      type: String,
      
      unique: true,
    },
    phoneNumber: {
      type: String,
      
    },
    password: {
      type: String,
    
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [{ type: String }],
      resume: {
        type: String, //resume url
      },
      resumeOriginalName: {
        type: String,
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User",userSchema)