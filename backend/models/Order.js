const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"User"},
    product:{type:mongoose.Schema.ObjectId,ref:"Product"},
    qty:{type:String,required:true},
    status:{type:String,required:true},
    isReceived:{type:String,required:true},
    isPaid:{type:String,required:true}  
},{timestamps:true})
module.exports=mongoose.model("Order",orderSchema);
