const Order=require("../models/Order")
const User=require("../models/User");
const Product=require("../models/Product");
exports.submitOrder=async (req,res)=>{
    const product=req.body.data;
    const user=req.user._id
    const data=await Order.find({product,user,status:"In Progress"}).select()
    if(data.length!=0)
        return res.status(400).json({err:"Please this Product is already ordered !!"})
    const order=await Order.create({
        user,product,status:"In Progress",
        qty:1,
        isReceived:"False",
        isPaid:"False",
    })
    if(order)
        return res.json({message:"Order Added with success !!"});
}
exports.getData=async (req,res)=>{
    const data=await Order.find({status:"In Progress"}).select().populate([
        {
            path:"user",
            model:"User",
            select:["_id","first_name","last_name"],
            match:{
                _id:req.user._id
            }

        },{
            path:"product",
            model:"Product",
            select:["_id","name","price"]
        }
    ])
    if(data)
        return res.json({data})
    return res.status(400).json({err:data});
}
exports.clearALL=async (req,res)=>{
    const data=await Order.deleteMany({user:req.user._id,status:"In Progress"})
    if(data)
        return res.status(400).json({message:"Orders Deleted with success !!"})
    return res.status(400).json({err:data})
}
exports.updateQty=async (req,res)=>{
    const {order,step}=req.body
    var data=await Order.find({_id:order}).select()
    if(parseInt(data[0].qty)==1 && step=="remove"){
         data=await Order.findOneAndDelete({_id:order})
         if(data)
            return res.json({message:"Product Deleted with success !!"})
    }
        if((parseInt(data[0].qty)==1 && step=="add") || (parseInt(data[0].qty)>1) ){
         data=await Order.find({_id:order}).select()
         if(data){
             console.log(parseInt(data[0].qty)+1)
             await Order.findOneAndUpdate(
                {_id:order},
                {$set:{
                    qty:step=="add"?(parseInt(data[0].qty)+1).toString():(parseInt(data[0].qty)-1).toString()
                }}
            )
            return res.json({message:"Product Updated with success !!"})

         }
    }
}
exports.paid=async (req,res)=>{
   const ids= req.body.ids;
   const data=await Order.updateMany(
    {_id:{$in:ids}},
    {$set:{isReceived:"True",
        isPaid:"True",status:"Confirmed"
}}
)
if(data)
    return res.json({message:"Orders Confirmed and deleverd !!"})
return res.status(400).json({err:data});

}