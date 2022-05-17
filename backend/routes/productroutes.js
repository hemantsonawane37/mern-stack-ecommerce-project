const express = require("express");
const { GetAllProducts, createProduct, UpdateProduct, DeleteProduct, GetProductDetails, createProductReview, DeleteProductsReviews, GetProductsReviews, GetAllProductsAdmin } = require("../controllers/productcontroller");
const { isAuthenticated,autherizedRole } = require("../middleware/auth");
const Router = express.Router();

Router.get("/products", GetAllProducts);
Router.get("/admin/products",isAuthenticated,autherizedRole('admin'),GetAllProductsAdmin)
Router.post("/product/new",isAuthenticated,autherizedRole("admin"),createProduct)
Router.put("/product/:id",isAuthenticated,autherizedRole("admin"),UpdateProduct)
Router.get("/product/:id",GetProductDetails)
Router.delete("/product/:id",isAuthenticated,autherizedRole("admin"),DeleteProduct)
Router.put("/review",isAuthenticated,createProductReview)
Router.get("/admin/product/reviews",isAuthenticated,autherizedRole("admin"),GetProductsReviews)
Router.delete("/reviews/delete",isAuthenticated,autherizedRole("admin"),DeleteProductsReviews)









module.exports = Router;
