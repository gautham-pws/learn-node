const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    // Name of the product
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Description of the product
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Is the product published or not
    published: {
      type: Boolean,
      default: false,
    },

    // Cover image of the product stored as a binary Buffer
    image: {
      type: Buffer,
    },

    // Price of the product
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isFinite,
        message: "Price must be a valid number.",
      },
    },

    // Rating of the product
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      validate: {
        validator: Number.isFinite,
        message: "Rating must be a valid number between 0 and 5.",
      },
    },

    // ID of the user who created the product
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing the User model
    },

    // ID of the user who created the product
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing the User model
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing the User model
    },
  },
  {
    // Automatically include createdAt and updatedAt fields
    timestamps: true,
  }
);

productSchema.index({userId: 1});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
