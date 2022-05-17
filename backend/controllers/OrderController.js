const Order = require("../modules/ordermodule");
const CatchAsyncError = require("../middleware/catchasyncerror");
const errorhandler = require("../util/errorhendler");
const Product = require("../modules/productsmodules");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

exports.newOrder = CatchAsyncError(async (req, res, next) => {
  const {orderInfo, cartProducts,shippingInfo} = req.body;

  const  {subtotal,tax,totalPrice,shippingCharges,user,paymentInfo} = orderInfo; 

 const orderProducts = cartProducts.map((item)=> {
   return{
     name:item.name,
     price:item.price,
     quantity:item.Quantity,
     image:item.images,
     product:item._id
   }
 })

 
 const order = await Order.create({
    shippinginfo:{
      address:shippingInfo.address,
      country:shippingInfo.country,
      city:shippingInfo.city,
      pincode:shippingInfo.pincode,
      state:shippingInfo.state,
      phoneNo:shippingInfo.PhoneNo
    },
    orderitems:orderProducts,
    paymentinfo:paymentInfo,
    user:user,
    itemprice:subtotal,
    taxprice:tax,
    shippingprice:shippingCharges,
    totalprice:totalPrice,
    paidAt: Date.now(),
  });

  

  res.status(201).json({
    success: true,
    order,
  });
});

exports.GetSingleOrder = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new errorhandler(`order NOT Found with this ID${req.params.id} `, 404)
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get logged user order

exports.GetMyOrders = CatchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

// admin only

exports.GetAllOrders = CatchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalprice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// delete order

exports.DeleteOrder = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new errorhandler(`order NOT Found with this ID${req.params.id} `, 404)
    );
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});

// update order status

exports.UpdateOrderStatus = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new errorhandler(`order NOT Found with this ID${req.params.id} `, 404)
    );
  }

  if (order.orderstatus === "Delivered") {
    return next(
      new errorhandler("you have all ready Delivered this order", 400)
    );
  }

  order.orderitems.forEach(async (product) => {
    await updateStock(product.product, product.quantity);
  });

  order.orderstatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliverdAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });

  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
  }
});

exports.OrderCheckOut = CatchAsyncError(async (req, res, next) => {

  const mypayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerc",
    },
  });

  res.status(200).json({ Client_Secrete: mypayment.client_secret });
});

exports.GetStripeApiKey = CatchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .json({
      stripeApiKey:
       process.env.STRIP_PUBLIC_KEY,
    });
});
