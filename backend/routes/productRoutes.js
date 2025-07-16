const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth");
const {submitProduct,getDataInput}=require("../controller/productContraller");
Router.post("/submitProduct",auth,submitProduct);
Router.post("/getDataInput",auth,getDataInput);
module.exports=Router;