import mongoose from "mongoose";

import productSchema from "./product.schema";
import userSchema from "./user.schema";

export const Product = mongoose.model("Product", productSchema);
export const User = mongoose.model("User", userSchema);
