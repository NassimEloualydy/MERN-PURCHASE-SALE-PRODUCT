const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth");
const {submitProduct}=require("../controller/productContraller");
Router.post("/submitProduct",auth,submitProduct);
module.exports=Router;