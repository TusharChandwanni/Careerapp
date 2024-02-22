const mongoose = require('mongoose');


const productSchema  = new mongoose.Schema( {
    
    name : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    companyID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    description  : {
        type : String,
        required: true
    },
    category : {
        type : String,
        required :true
    },
    price : {
        type : String,
    },
    image:{
        public_id: {
            type: String,
            default:"xyz"
        }, 
        url: {
            type: String,
            default:"my"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
})
module.exports = mongoose.model("Product",productSchema)