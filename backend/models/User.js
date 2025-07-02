const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    pw:{type:String,required:true},
    role:{type:String,required:true},
    
},{timestamps:true})
module.exports=mongoose.model("User",userSchema);