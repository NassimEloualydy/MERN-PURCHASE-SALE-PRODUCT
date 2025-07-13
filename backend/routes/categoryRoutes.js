const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth");
const {submitCategory,getData,deleteCategory}=require("../controller/categoryController");
Router.post("/submitCategory",auth,submitCategory);
Router.post("/getData/:offset",auth,getData);
Router.post("/deleteCategory/:_id",auth,deleteCategory)
module.exports=Router