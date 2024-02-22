const ErrorHandler = require("../utils/errorhandler");
const catchasyncerrors = require("../middleware/catchasyncerrors");
const User = require("../models/usermodels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Get all the connections of the currently logged in User
exports.allConnections = catchasyncerrors(async (req, res, next) => {
  // Middleware will provide req.user._id as the id of the loggedin user
  try {
    const loggedInUser = await loggedInUser
      .findById(req.user._id)
      .populate("connections", "-password");

    if (!loggedInUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userConnections = loggedInUser.connections; // This is an array of populated Users
    return res.status(200).json({
      success: true,
      connections: userConnections,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});
const Post=require("../models/postmodel");
const { stringify } = require("querystring");

//register user
exports.registerUser=catchasyncerrors(async(req,res,next)=>{
   const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
   })
    const description="";
    const {name,email,password,phoneno,isCompany}=req.body;
    const user=await User.create({
        name,email,password,phoneno,description,isCompany,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });
    sendToken(user,201,res);
})

//login user
exports.loginUser = catchasyncerrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//logout user
exports.logout = catchasyncerrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Loggedout",
  });
});

//forgot password
exports.forgotpassword = catchasyncerrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  //get reset password token
  const resettoken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetpasswordurl = `${process.env.FRONTEND_URL}/password/reset/${resettoken}`;
  const message = `your password reset token is t:-\n\n${resetpasswordurl}\n\n if you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "CareerCircuit Password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPasswords=catchasyncerrors(async(req,res,next)=>{
    
  //creating token hash
  const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user=await User.findOne({resetPasswordToken:resetPasswordToken,resetPasswordExpire:{$gt:Date.now()},
});
if(!user){
  return next(new ErrorHandler("reset password token is invalid or has expired",404));

}
if(req.body.password!==req.body.confirmPassword){
  return next(new ErrorHandler("Password does not match password",400));

}
user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
sendToken(user,200,res);


})



exports.getAllCompany = async(req,res) => {
    try {
        const data = await User.find({isCompany : true});
        res.send(data);
    } catch (error) {
        console.log(err);
    }
}
exports.profileUpdateCompany = async(req,res)=>{
    try {
        const {userID,industry , address, website,description} = req.body;
        const user = await User.findById(userID);
        user.companyProfile = {
            industry : industry,
            address : address,
            website : website,
            description : description
        }
        user.save();
        res.status(201).json({
            msg :  " Updated"
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getCompanyProfile = async(req,res)=>{
    const profileData = await User.findById(req.body.userID);
    // console.log(profileData.companyProfile);
    res.send(profileData.companyProfile);
}

exports.getCompanyDetails = async(req,res)=>{
    const details = await User.findById(req.body.id).populate('jobs').populate('products');
    console.log(details);
    res.send(details);
}
//get user details

exports.getuserdetails=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

//update user password

exports.updatepass=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched= await user.comparePassword(req.body.oldpassword,user.password);
    if(!isPasswordMatched){
    return next(new ErrorHandler("old password is incorrect",401));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
});

//update user profile

exports.updateprofile=catchasyncerrors(async(req,res,next)=>{
  let users=await User.findById(req.user.id);
  console.log(req.body);
    const newUserdata={
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        description:req.body.description
    }
    const  ex={
        company:req.body.company,
        role:req.body.role,
        years:req.body.years
    };
    const ed={
        college:req.body.college,
        course:req.body.course,
        grade:req.body.grade
    };
   users.experience.push(ex);
   users.education.push(ed);
   const s=req.body.skills.split(',');
   console.log(typeof(s));
   for(var i=0; i< s.length; i++){  
    users.skills.push(s[i]);  
    }  
   await users.save();
if(req.body.avatar !== ""){
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    newUserdata.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
    }
}

    const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    });
});

//create new post
exports.createpost = catchasyncerrors(async (req, res, next) => {
    
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }
    const imageslink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products" });
        imageslink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imageslink;
    req.body.user = req.user.id;
    const post = await Post.create(req.body);
    res.status(201).json({
        success: true,
        post
    })
})

//get all posts

exports.getallposts=catchasyncerrors(async(req,res,next)=>{
    const posts=await Post.find();

    res.status(200).json({
        success:true,
        posts,
    });
});  

//create new comment
exports.createcomment=catchasyncerrors(async(req,res,next)=>{
    let post = await Post.findById(req.body.postID);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }
    myComment = {
        "commenter" : `${req.user.id}`, 
        "com" : `${req.body.comment}`
    };
   post.usercomment.push(myComment);
   await post.save();
    res.status(200).json({
        success:true,
        post,
    });
});  


//get post details
exports.getPostDetails=catchasyncerrors(async(req,res,next)=>{
    const postID=req.params.id;
    let post = await Post.findById(postID);
    res.status(200).json({
        success:true,
        post,
    });
});  


//create new like
exports.createlike=catchasyncerrors(async(req,res,next)=>{
    console.log(req.body);
    let post = await Post.findById(req.body.postID);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }
    myLike = {
        "liker" : `${req.user.id}`, 
        "liketype" : `${req.body.liketype}`
    };
   post.userlikes.push(myLike);
   await post.save();
    res.status(200).json({
        success:true,
        post,
    });
});  


//get user details

exports.getuserdetails=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

//get specific user details
exports.getalluserdetails=catchasyncerrors(async(req,res,next)=>{
    const user=await User.find();

    res.status(200).json({
        success:true,
        user,
    });
});

exports.companyFollow = async(req,res)=>{
    const {follower,following} = req.body;
    const user = await User.findById(follower);
    const company = await User.findById(following);

    company.followers.push(follower);
    company.save();
    user.following.push(following);
    user.save();

    res.status(200).json({
        msg : "Following"
    })
}
exports.companyUnfollow = async(req,res)=>{
    
    const {follower,following} = req.body;
    const user = await User.findById(follower);
    const company = await User.findById(following);
    company.followers =  company.followers.filter((item)=>{
        return item.toString() !== follower;
    })
    company.save();
    
    user.following = user.following.filter( (item)=>{
        return item.toString()!==following;
    })
    user.save();


    res.status(200).json({
        msg : "Unfollowing"
    })
}