const Product = require('../models/productModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');

// create product -- admin
const createProduct = catchAsyncErrors(async (req,res,next) => {
    
    req.body.user = req.user.id
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


// get all products
const getAllProducts = catchAsyncErrors(async (req,res) => {

    const resultsPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultsPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// update product - admin
const updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) if (!product) return next(new ErrorHandler('Product not found',500));

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) if (!product) return next(new ErrorHandler('Product not found',500));

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });
});

const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler('Product not found',500));

    res.status(200).json({
        success:true,
        product
    });
});

module.exports = {createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails};