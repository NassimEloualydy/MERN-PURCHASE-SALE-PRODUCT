const express=require("express");
const Route=express.Router()
const {register,login,logout}=require("../controller/userController")
const {auth}=require("../middleware/auth")
Route.post("/register",register);
Route.post("/login",login);
Route.post("/logout",auth,logout);
module.exports=Route;