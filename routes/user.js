
const {Router} = require("express")
const User = require("../models/user")

const router = Router()

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})



router.post("/signin",async (req,res)=>{
    try {
        const {email,password} = req.body
        const token =  await User.matchPasswordAndGenerateToken(email,password)
        res.cookie("token",token)
        res.redirect("/");
    } catch (error) {
        return res.render("signin",{
            error:"wrong email and password"
        })
    }
    

})



router.post("/signup", async (req,res) => {
    
    const user = await User.create({
         fullName:req.body.fullName,
         email:req.body.email,
         password:req.body.password
       
    })
    console.log(user)
    res.render("home")
    
})
module.exports = router
















