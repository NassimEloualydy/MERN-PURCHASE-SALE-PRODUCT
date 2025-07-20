const Product=require("../models/Product");
const Category=require("../models/Category");
const User=require("../models/User");
const formidable=require("formidable");
const fs=require("fs");
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
    const {_id,name,description,price,qty,status,rating,sizes,saller,category}=fields;       
       if(_id){
        if(!name || !description || !price || !qty || !rating || !sizes || !saller || !category)
            return res.status(400).json({err:"Please all the fields are required !!"})
        var p=await Product.find().select("-photo").and([{name},{_id:{$ne:_id}}])
        if(p.length!=0)
            return res.status(400).json({err:"Please the name is already taken !!"});
        p=await Product.find().select("-photo").and([{description},{_id:{$ne:_id}}])
        if(p.length!=0)
            return res.status(400).json({err:"Please the name is already taken !!"});
        // const product=await Product.create({
        //     name,description,price,qty,rating,sizes,saller,category,status,
        //     photo:{
        //         data:fs.readFileSync(files.photo.path),
        //         contentType:files.photo.type
        //     }
        // })
               if(!files.photo){
                   const product=await Product.findOneAndUpdate({_id},{
                       $set:{
                       name,description,price,qty,rating,sizes,saller,category,status,
           
                       }
                   },{$new:true})
                   if(product)
                       return res.json({message:"Product Updated with success !!"})
                   return res.status(400).json({err:product})
               }else{
                   const product=await Product.findOneAndUpdate({_id},{
                       $set:{
                       name,description,price,qty,rating,sizes,saller,category,status,
                       photo:{
                           data:fs.readFileSync(files.photo.path),
                           contentType:files.photo.type
                       }
           
                       }
                   },{$new:true})
                   if(product)
                       return res.json({message:"Product Updated with success !!"})
                   return res.status(400).json({err:product})

               }

       }else{

           if(!files.photo)
                return res.status(400).json({err:"Please the photo is required !!"}) 
            if(!name || !description || !price || !qty || !rating || !sizes || !saller || !category)
                return res.status(400).json({err:"Please all the fields are required !!"})
            var p=await Product.find({name}).select("-photo")
            if(p.length!=0)
                return res.status(400).json({err:"Please the name is already taken !!"});
            p=await Product.find({description}).select("-photo")
            if(p.length!=0)
                return res.status(400).json({err:"Please the name is already taken !!"});
            const product=await Product.create({
                name,description,price,qty,rating,sizes,saller,category,status,
                photo:{
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                }
            })
            if(product)
                return res.json({message:"Product Added with success !!"})
            return res.status(400).json({err:product})
       }
})
}
exports.getDataInput=async (req,res)=>{
    const sallers=await User.find({role:"Saller"}).select("-photo");
    const categories=await Category.find().select()
    if(sallers && categories){
        return res.json({
            sallers,
            categories
        })
    }
    return res.status(400).json({err:categories});
}
exports.getData=async (req,res)=>{
    const offset=req.params.offset;
    const  {name,description,price,status,qty,sizes,rating,first_name,last_name,category}=req.body;
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    searchQuery.price={$regex:'.*'+price+'.*',$options:'i'}
    searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}
    searchQuery.qty={$regex:'.*'+qty+'.*',$options:'i'}
    searchQuery.sizes={$regex:'.*'+sizes+'.*',$options:'i'}
    searchQuery.rating={$regex:'.*'+rating+'.*',$options:'i'}
    const data=await Product.find(searchQuery).select("-photo").populate([
        {
            path:"saller",
            model:"User",
            select:["_id","first_name","last_name"],
            match:{
                first_name:{$regex:'.*'+first_name+'.*',$options:'i'},
                last_name:{$regex:'.*'+last_name+'.*',$options:'i'}
            }

        },
        {
            path:"category",
            model:"Category",
            select:["_id","name","sexe"],
            match:{
                name:{$regex:'.*'+name+'.*',$options:'i'},
            }
            
        }
    ]).sort({createdAt:-1}).skip(offset).limit(6)
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})

}
exports.getProductPhoto=async (req,res)=>{
    const _id=req.params._id;
    const product=await Product.find({_id}).select()
    res.set('contentType',product[0].photo.contentType);
    return res.send(product[0].photo.data);
}
exports.getDataProductByCategory=async (req,res)=>{
    const data=await Product.aggregate([{
    $lookup: {
      from: "categories",            // make sure this matches the MongoDB collection name
      localField: "category",
      foreignField: "_id",
      as: "categoryInfo"
    }
  },
  {
    $unwind: "$categoryInfo"         // extract the single category object
  },
  {
    $group: {
      _id: "$categoryInfo.name",     // group by category name
      count: { $sum: 1 }             // count products in each category
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      productCount: "$count"
    }
  }
])
if(data)
    return res.json({data})
return res.status(400).json({err:data});
}
exports.deleteProduct=async (req,res)=>{
    const _id=req.params._id
    const product=await Product.findOneAndDelete({_id})
    if(product)
        return res.json({message:"Product Deleted with success !!"})
    return res.json({err:product})
}