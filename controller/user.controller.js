import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"




//user Registation
export const register = async(req,res)=>{
    try{
      const{fullname,email,phoneNumber,password,role} = req.body;

      if(!fullname ||!email || !phoneNumbe || !password|| !role){
        return res.status(400).json({
            message:"something is missing",
            success:false
        })
      }

      const user = await User.findOne({email:email});
       
       if(user){
        return res.status(400).json({
            message:"user already  exit with this email",
            success:false
        })
       }

       const hashedPassword = await bcrypt.hash(password,10);

       await User.create({fullname,email,phoneNumber,password:hashedPassword,role})

       return res.status(201).json({
          message:"user created successfully",
          success:false
       })

    }
    catch(err){
        console.log(err)
    }
}

//user Login

export const login = async(req,res)=>{
    try{
        const {email,password,role} = req.body;

        if(!email || !password|| !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
          };
    
          let user = await User.findOne({email:email});
    
          if(!user){
              return res.status(400).json({
                message:"incorrect email or password",
                success:false
              })
          };
    
          const isPasswordMatch = await bcrypt.compare(password,user.password);
    
          if(!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false
              })
          }
    
          //check role is correct or not
    
          if(role !== user.role){
            return res.status(400).json({
                message:"account does not exist with current role",
                success:false;
            })
          }
    
          //token generation for login user
    
          const tokenData={
            userId:user._id
          }
          const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
           user={_id:user._id,fullname:user.fullname,email:user.email,phoneNumber:user.phoneNumber,role:user.role}

            
          return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            message:`welcome back ${user.fullname}`,
            success:true
          })


    }
    catch(err){
        console.log(err)
    }
}


//logout

export const logout = async(req,res)=>{
    try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logout successfully",
        success:true
      })
    }
    catch(err){
        console.log(err)
    }
}

//update profile

export const updateProfile = async(req,res)=>{
    try{
     const {fullname,email,phoneNumber,bio,skills} = req.body;
      //req.file
      if(!fullname || !email || !phoneNumber || !bio || !skills){
        return res.status(400).json({
            message:"something is missing",
            success:false
        })
      }
         
      const skillsArray = skills.split(",");

      const userId = req.id;//middleware

      let user = await User.findById(userId);

      if(!user){
        return res.status(400).json({
            message:"user not found",
            success:false
        })
      }
      //update data
       user.fullname = fullname,
       user.email=email,
       user.phoneNumber = phoneNumber,
       user.profile.bio = bio,
       user.profile.skills = skillsArray
         

       //resume comes later here



       await user.save();



       user={_id:user._id,fullname:user.fullname,email:user.email,phoneNumber:user.phoneNumber,role:user.role}


       return res.status(200).json({
        message:"profile updated successfully",
        user,
        success:true
       })

    }
    catch(err){
        console.log(err)
    }
}