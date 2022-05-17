const mongoose = require("mongoose");

const OrderSchama = new mongoose.Schema({
  shippinginfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderitems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: Array, required: true },

      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentinfo: {
    id: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
  },
  paidAt: {
    type: Date,
    required: true,
  },

  itemprice: {
    type: Number,
    required: true,
  },
  taxprice: {
    type: Number,
    default: 0,
    required: true,
  },

  shippingprice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalprice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderstatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliverdAt: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchama);
