const express=require("express")
require("dotenv").config()
const cors=require("cors");
const app=express()
const colors=require('colors')
const mongoose=require("mongoose")
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 4000
const DATABASE=process.env.DATABASE
mongoose.connect(DATABASE).then(()=>{
    console.log("Database Connted".bgBlue)
}).catch((err)=>console.log(err))
app.listen(PORT,()=>{
    console.log(`App Running On Port ${PORT}`.blue)
})
