const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.createProduct = catchAsyncError(async (req,res) =>{
    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
})


exports.getAllProducts =catchAsyncError(async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    const product1 = await Product.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        product1
    })
})

exports.deleteProduct = catchAsyncError(async (req,res,next) =>{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

exports.getProductDetails = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
})
