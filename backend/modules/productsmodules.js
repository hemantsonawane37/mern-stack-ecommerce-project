const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "product description required"],
    },
    price: {
      type: Number,
      required: [true, "product price required"],
      maxlength: [8, "price cannot exceed 8 char"],
    },
    ratings: { type: Number, default: 0 },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "please enter product stock"],
      maxlength: [4, "stock cannot exceed 8 char"],
      default: 1,
    },
    numofreviwe: {
      type: Number,
      default: 0,
    },
    reviewes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        avatar: {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
