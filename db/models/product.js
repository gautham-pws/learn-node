const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  // name: For name of the products,
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // description: For description,
  description: {
    type: String,
    required: true,
    trim: true,
  },

  // published: is products published or not
  published: {
    type: Boolean,
    default: false,
  },

  // image: cover page of the products
  image: {
    type: Buffer,
  },

  // Price: 200
  price: {
    type: String,
    required: true,
    trim: true,
  },

  // Rating: 3
  rating: {type: String, trim: true},

  // userid: objectId
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  // createdBy : user objectid
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  // CreatedAt: Date time
  createdAt: {type: Date, required: true, trim: true},

  // updatedAt: Date time
  updatedAt: {type: Date, required: true, trim: true},
});

const Products = mongoose.model("productSchema", productSchema);

module.exports = Products;
