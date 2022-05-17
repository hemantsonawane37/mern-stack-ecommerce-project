const Product = require("../modules/productsmodules");
const errorhandler = require("../util/errorhendler");
const catchAsyncError = require("../middleware/catchasyncerror");
const ApiFeatures = require("../util/apifeatures");
const { application } = require("express");
const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../modules/usermodules");
var cloudinary = require("cloudinary").v2;

//create product -- admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  images = req.body.images;

  const ImageLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Products",
    });

    ImageLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = ImageLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ msg: product });
});

// get all product

exports.GetAllProducts = catchAsyncError(async (req, res, next) => {
  const ResultPerPage = 10;
  const productcount = await Product.countDocuments();
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .Search()
    .Filter()
    .pagination(ResultPerPage);

  const products = await apifeature.query;

  res.status(200).json({ Products: products, ProductCount: productcount });
});

// get admin product

exports.GetAllProductsAdmin = catchAsyncError(async (req, res, next) => {
  const Productcount = await Product.countDocuments();

  const products = await Product.find();

  res.status(200).json({ Products: products, Productcount });
});

// find and update

exports.UpdateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new errorhandler("product not found", 404));

  for (let i = 0; i < product.images.length; i++) {
  await cloudinary.uploader.destroy(product.images[i].public_id)
   
  }

  let images = [];

  images = req.body.images;

  const ImageLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Products",
    });
  

    ImageLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = ImageLink;
  req.body.user = req.user.id;



  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    msg: product,
  });
});

// delete product

exports.DeleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(500).json({ success: false, msg: "Product Not Found !" });

// deleting from cloudinary
  for (let i = 0; i < product.images.length; i++) {
   await cloudinary.uploader.destroy(product.images[i].public_id)
    
  }

  await product.remove();
  res.status(200).json({ success: true, msg: "product deleted successfully" });
});

// get product details

exports.GetProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({ success: false, msg: "Product Not Found !" });
  }
  res.status(200).json({ success: true, product });
});

// create new review or update review

exports.createProductReview = catchasyncerror(async (req, res, next) => {
  const { rating, comment, ProductId,avatar } = req.body;
  const review = {
    user: req.user._id,
    avatar:avatar,
    name: req.user.name,
    rating: rating,
    comment,
  };

  const product = await Product.findById(ProductId);

  const isReviewed = product.reviewes.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviewes.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviewes.push(review);
    product.numofreviwe = product.reviewes.length;
  }

  let avg = 0;
  product.reviewes.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviewes.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// get all reviews of a single product

exports.GetProductsReviews = catchAsyncError(async (req, res, next) => {

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new errorhandler("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviewes,
  });
});

// delete review
exports.DeleteProductsReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new errorhandler("Product not found", 400));
  }

  const reviews = product.reviewes.filter((rev) => {
    rev._id.toString() !== req.query.id;
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  let numofreviwe = 0;
  ratings = avg / reviews.length;
  if (isNaN(ratings)) ratings = 0;

  numofreviwe = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviewes: reviews,
      ratings,
      numofreviwe,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
  });
});
