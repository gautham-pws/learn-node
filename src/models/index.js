import mongoose from "mongoose";
import "../services/user.service.js";
import productSchema from "./product.schema.js";
import userSchema from "./user.schema.js";

export const Product = mongoose.model("Product", productSchema);
export const User = mongoose.model("User", userSchema);
