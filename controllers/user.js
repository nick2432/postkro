const User = require("../models/user.js");
const Post = require("../models/post.js");
exports.Signin = async (req,res)=>{
    try{
     const {name,email,password}=req.body;
     let user=await User.findOne({email}).select("+password");
     if(user){
         return res.status(400)
         .json({success: false,message:"User already exists"});
     }
     
     user = await User.create({
         name,
         email,
         password,
         avatar:"dfsadf"
     })
     const token = await user.generateToken();
     res.status(201).cookie("token", token).json({success:true,user,token});
    }catch(error){
     res.status(500).json({
         success:false,
         message:error.message,
     });
    }
 };
 exports.Login = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        let user=await User.findOne({email}).select("+password");  
        if(!user){
            return res.status(400).json({
                success: false,
                message:"User dose not exist"
            });
        }

        const isMatch = await user.matchPassword(passsword);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message:"Incorrect password"
            });
        }

        const token = await user.generateToken();

        res.status(200).cookie("token", token).json({
            success: true,
            user,
            token,
        })

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }