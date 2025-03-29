
const { Schema,model } = require("mongoose")
const {createHmac,randomBytes} = require("crypto")
const {createTokenForUser,validateToken} = require("../services/authentication")
const { schema } = require("./blog")
const { type } = require("os")

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,

    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },
    commentedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})


const Comment = model("comment",commentSchema)
module.exports = Comment;









