const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth")
const {submitOrder,updateQty,getData,clearALL}=require("../controller/orderController");
Router.post("/submitOrder",auth,submitOrder);
Router.post("/getData",auth,getData);
Router.post("/clearALL",auth,clearALL);
Router.post("/updateQty",auth,updateQty);
module.exports=Router
