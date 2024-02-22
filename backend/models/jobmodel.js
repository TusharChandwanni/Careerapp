const mongoose = require('mongoose');


const jobSchema  = new mongoose.Schema( {
    company :{
        type : String,
        required: true
    },
    companyID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    description  : {
        type : String,
        required: true
    },
    profileName : {
        type : String,
        required: true,
    },
    salary : {
        type : String,
        required :true
    },
    skills : {
        type : String,
        required :true
    },
    location : {
        type : String,
        required :true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    expire : {
        type : Date,
        required : true
    },

    applications : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ]

})
module.exports = mongoose.model("Job",jobSchema)