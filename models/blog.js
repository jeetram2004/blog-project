
const { Schema,model } = require("mongoose")
const {createHmac,randomBytes} = require("crypto")
const {createTokenForUser,validateToken} = require("../services/authentication")

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Blog = model("blog",blogSchema)
module.exports = Blog;




