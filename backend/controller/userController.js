const User=require("../models/User")
const formidable=require("formidable")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken");
const fs=require("fs");
require("dotenv").config();
exports.register=async (req,res)=>{
   const form= new formidable.IncomingForm()
   form.keepExtensions=true
   form.parse(req,async (err,fields,files)=>{
    const upload = multer();
    const {first_name,last_name,email,role,phone,password,contentType,uri}=fields;
    console.log(fields)
    return
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
        password_new=await bcryptjs.hash(password,salt);
        // const d=await bcryptjs.compare("pw",password_new)
        // console.log(password_new)
        // console.log(d)
        const u=await User.create({
            first_name,last_name,email,role:"Saller",phone,pw:password_new,
            photo:{
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        })
        return res.json({message:"User Registered with Success"})

})
}
exports.login=async (req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    const user=await User.find({email}).select("-photo")
    if(user.length==0){
        console.log("Not found")
        return res.status(400).json({err:"Email or the password is wrong !!"})
    }
    const data=await bcryptjs.compare(password,user[0].pw)

    if(!data)
        return res.status(400).json({err:"The password doesn't match !!"});
    const token=jwt.sign({id:user[0]._id},process.env.JWT_SECRTE,{expiresIn:"30d"})
    return res.json({_id:user[0]._id,first_name:user[0].first_name,last_name:user[0].last_name,token})

}
exports.getPhoto=async (req,res)=>{
    const _id=req.params._id
    const user=await User.find({_id}).select()
    // console.log(user[0].photo.contentType)
    res.set("contentType",user[0].photo.contentType)

    return res.send(user[0].photo.data);
}
