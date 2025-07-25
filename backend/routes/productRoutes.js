const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth");
const {submitProduct,getProductPhoto,getDataHome,getDataInput,getDataProductByCategory,getData,deleteProduct}=require("../controller/productContraller");
Router.post("/submitProduct",auth,submitProduct);
Router.post("/getDataInput",auth,getDataInput);
Router.post("/getData/:offset",auth,getData);
Router.get("/getProductPhoto/:_id",getProductPhoto);
Router.post("/getDataProductByCategory",auth,getDataProductByCategory);
Router.post("/deleteProduct/:_id",auth,deleteProduct);
Router.post("/getDataHome/:offset",auth,getDataHome);

module.exports=Router;
