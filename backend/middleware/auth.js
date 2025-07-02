const jwt=require("jsonwebtoken")
const User=require("../models/User");
require("dotenv").config()
exports.auth=async (req,res,next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRTE)
            const u=await User.find({_id:decoded.id}).select("-photo")
            if(u.length!=1)
                return res.status(400).json({err:"Not authorized !! "})
            req.user=u[0]
            next()
        }
    }catch(error){
        return res.status(400).json({err:error})
    }
}