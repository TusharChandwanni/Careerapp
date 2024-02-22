const mongoose = require("mongoose");
const validator=require('validator');


const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    images:[ 
        {
            public_id: {
                type: String
            }, 
            url: {
                type: String 
            }
        }
    ],
    comment: {
        type: String
    },
    usercomment:[
        {
            commenter:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
            },
            com: {
                type: String 
            }
        }
    ],
    userlikes:[
        {
            liker:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
            },
            liketype:{
                type:String
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now(),
    }
   
});




module.exports=mongoose.model("Post",postSchema);

