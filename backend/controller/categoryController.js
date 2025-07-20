const Category=require("../models/Category");
const Product=require("../models/Product")
exports.submitCategory=async (req,res)=>{
    
    var {name,sexe,_id}=req.body;
    sexe=sexe.toString()
    // return 

    if(_id!=undefined){
    const data=await Category.find().and([{name},{_id:{$ne:_id}}]).select()
    if(data.length!=0)
        return res.status(400).json({err:"Please the name is already exist !!"})
    // const category=await Category.create({
    //     name,
    //     sexe
    // })
    const category=await Category.findOneAndUpdate({_id},{$set:{name,sexe}},{$new:true});
    if(category)
        return res.json({message:"Updated with success !!"})
    return res.status(400).json({err:category})

    }else{
    const data=await Category.find({name}).select()
    if(data.length!=0)
        return res.status(400).json({err:"Please the name is already exist !!"})
    const category=await Category.create({
        name,
        sexe
    })
    if(category)
        return res.json({message:"Added with success !!"})
    return res.status(400).json({err:category})

    }
}
exports.getData=async (req,res)=>{
    const {name,sexe}=req.body;
    const offset=req.params.offset;
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.sexe={$regex:'.*'+sexe+'.*',$options:'i'}
    const data=await Category.find(searchQuery).sort({createdAt:-1}).skip(offset).limit(8).select()
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}
exports.deleteCategory=async (req,res)=>{
    const _id=req.params._id
    const category=await Category.findOneAndDelete({_id})
    if(category)
        return res.json({message:"Deleted with success !!"})
    return res.status(400).json({err:category})
}