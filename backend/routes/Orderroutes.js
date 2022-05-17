const express = require("express");
const { isAuthenticated, autherizedRole } = require("../middleware/auth");
const {
  newOrder,
  GetSingleOrder,
  GetMyOrders,
  GetAllOrders,
  UpdateOrderStatus,
  DeleteOrder,
  OrderCheckOut,
  GetStripeApiKey,
} = require("../controllers/OrderController");
const Router = express.Router();

Router.post("/order/new", isAuthenticated, newOrder);
Router.get("/order/:id", isAuthenticated, GetSingleOrder);
Router.get("/orders/me", isAuthenticated, GetMyOrders);
Router.get("/orders/admin", isAuthenticated, autherizedRole("admin"), GetAllOrders);
Router.put( "/order/status/:id",isAuthenticated, autherizedRole("admin"), UpdateOrderStatus);
Router.delete("/order/:id", isAuthenticated, autherizedRole("admin"), DeleteOrder);
Router.post("/payment/process", isAuthenticated,OrderCheckOut);
Router.get("/stripeapikey",isAuthenticated,GetStripeApiKey)

module.exports = Router;
