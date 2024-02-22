const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "name should have minimum 4 characters"],
  },
  isCompany: {
    type: Boolean,
    required: true,
  },
  phoneno: { type: String, required: true },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "plese enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minLength: [8, "Password should be of minimum 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: "xyz",
    },
    url: {
      type: String,
      default: "my",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  experience:[{
    company:{
        type:String,
    },
    role:{
        type:String,
    },
    years:{
        type:Number
    },
  }],
  skills:[{type:String}],
  education:[
    {
        college:{type:String},
        course:{type:String},
        grade:{type:Number},
    }
  ],
  description:{
    type:String
  },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
  companyProfile: {
    industry: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notifications : [
    {
      sender :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      types : {
        type : String,
      },date : {
        type : Date,
        default : Date.now()
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (password, passwords) {
  return await bcrypt.compare(password, passwords);
};

//generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resettoken = crypto.randomBytes(20).toString("hex");
  //hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resettoken;
};

// module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.models.User || mongoose.model('User',userSchema);
// export default User;