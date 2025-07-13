const Product=require("../models/Product");
const Category=require("../models/Category");
const User=require("../models/User");
const formidable=require("formidable");
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        console.log(fields);
    })
}
