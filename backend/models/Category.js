const mongoose=require("mongoose");
const categorySchema=mongoose.Schema({
    name:{type:String,required:true},
    sexe:{type:String,required:true}
},{timestamps:true})
module.exports=mongoose.model("Category",categorySchema);