
require("dotenv").config()
const path = require('path')
const express = require('express')
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const app= express();
const PORT = process.env.PORT || 8001;

const Blog = require("./models/blog")
mongoose.connect(process.env.MONGO_URL).then((e)=>{
    console.log("mongodb connected");
    
})
app.set("view engine",'ejs')
app.set('views',path.resolve("./views"))

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
    console.log(req.user);
    
    const allBlogs = await Blog.find({}).sort('createdAt')
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)



app.listen(PORT,()=>console.log(`server is running on port:${PORT}`))









