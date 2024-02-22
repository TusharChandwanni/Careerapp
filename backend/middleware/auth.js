const catchasyncerrors = require("./catchasyncerrors");
const jwt=require("jsonwebtoken");
const User=require("../models/usermodels");
const ErrorHandler = require("../utils/errorhandler");


exports.isAuthenticatedUser=catchasyncerrors(async(req ,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("please login to access this resource",401));

    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user= await User.findById(decodedData.id);
next();

})
