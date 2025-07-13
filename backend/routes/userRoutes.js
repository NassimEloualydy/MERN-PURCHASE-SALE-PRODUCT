const express=require("express");
const Route=express.Router()
const {register,getPhoto,login,logout}=require("../controller/userController")
const {auth}=require("../middleware/auth")
Route.post("/register",register);
Route.post("/login",login);
Route.get("/getPhoto/:_id",getPhoto);
module.exports=Route;