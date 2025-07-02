const User=require("../models/User")
const formidable=require("formidable")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.register=async (req,res)=>{
   const form= new formidable.IncomingForm()
   form.keepExtensions=true
   form.parse(req,async (err,fields,files)=>{
    const {first_name,last_name,email,role,phone,pw}=fields;

    var user=await User.find({first_name,last_name}).select("-photo")
    if(user.length!=0)
        return res.status(400).json({err:"Please the first name and the last name is already exist !!"});
   
    user=await User.find({email}).select("-photo")
    if(user.length!=0)
        return res.status(400).json({err:"Please the email is already exist !!"});
    user=await User.find({phone}).select("-photo")
    if(user.length!=0)
        return res.status(400).json({err:"Please the phone is already exist !!"});

        const salt=await bcryptjs.genSalt(10);
        password_new=await bcryptjs.hash(pw,salt);
        // const d=await bcryptjs.compare("pw",password_new)
        // console.log(password_new)
        // console.log(d)
        const u=await User.create({
            first_name,last_name,email,role,phone,pw:password_new
        })
        return res.json({message:"User Registered with Success"})

})
}
exports.login=async (req,res)=>{
    const {email,pw}=req.body;
    const user=await User.find({email}).select("-photo")
    if(user.length==0){
        console.log("Not found")
        return res.status(400).json({err:"Email or the password is wrong !!"})
    }
    const data=await bcryptjs.compare(pw,user[0].pw)
    console.log(data)

    if(!data)
        return res.status(400).json({err:"The password doesn't match !!"});
    const token=jwt.sign({id:user[0]._id},process.env.JWT_SECRTE,{expiresIn:"30d"})
    return res.json({first_name:user[0].first_name,last_name:user[0].last_name,token})

}
exports.logout=async (req,res)=>{
    
}