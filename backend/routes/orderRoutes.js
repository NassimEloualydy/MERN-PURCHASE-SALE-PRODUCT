const express=require("express");
const Router=express.Router();
const {auth}=require("../middleware/auth")
const {submitOrder,updateQty,getData,clearALL,paid}=require("../controller/orderController");
Router.post("/submitOrder",auth,submitOrder);
Router.post("/getData",auth,getData);
Router.post("/clearALL",auth,clearALL);
Router.post("/updateQty",auth,updateQty);
Router.post("/paid",auth,paid)
module.exports=Router
