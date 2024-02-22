const Product = require("../models/productsmodel");
const cloudinary = require("cloudinary");
const User = require("../models/usermodels");

exports.postProduct = async (req, res) => {
  try {
    const info = req.body.info;
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const product = await Product.create({
      name: info.name,
      company: info.company,
      companyID: info.companyID,
      description: info.description,
      category: info.category,
      price: info.price,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    const user = await User.findById(info.companyID);
    user.products.push(product._id);
    user.save();
    const followers = user.followers;
    followers.map(async function (item) {
      const follower = await User.findById(item);
      follower.notifications.push({
        sender: info.companyID,
        types: "PRODUCT",
      });
      follower.save();
    });

    res.status(201).json({
      success: true,
      msg: "Product Created",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
