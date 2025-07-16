const Product=require("../models/Product");
const Category=require("../models/Category");
const User=require("../models/User");
const formidable=require("formidable");
const fs=require("fs");
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
    const {name,description,price,qty,status,rating,sizes,saller,category}=fields;       
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