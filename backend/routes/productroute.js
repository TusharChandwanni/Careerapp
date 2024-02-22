const {postProduct, getProducts} = require( "../controllers/productcontroller" );


const express = require("express");

const router = express.Router();


router.route("/postproduct").post(postProduct);
router.route('/getmyproducts').get(getProducts)

module.exports=router;

