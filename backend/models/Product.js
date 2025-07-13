const mongoose=require("mongoose");
const producSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    status:{type:String,required:true},
    qty:{type:String,required:true},
    sizes:{type:String,required:true},
    rating:{type:String,required:true},
    saller:{type:mongoose.Schema.ObjectId,ref:"User",required:true},
    category:{type:mongoose.Schema.ObjectId,ref:"Category",required:true}
},{timestamps:true})
module.exports=mongoose.model("Product",producSchema);