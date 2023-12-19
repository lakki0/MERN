const Product = require("../models/productModel");

exports.createProduct = async(req,res,next) =>{
    const product = await Product.create(res.body);

    res.status(200).json({
        success:true,
        product
    })
}

exports.getAllProducts = (req,res)=>{
    res.status(200).json({message:"gets all products successfully"})
}
