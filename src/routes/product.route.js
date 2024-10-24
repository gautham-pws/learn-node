import {Router} from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = new Router();
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/fileUpload.js";

// GET api/users get all users, filter by id, email, role
router.get("/api/products", auth, getProducts);

// POST api/users create new user
router.post("/api/products", auth, upload.single("image"), createProduct);

// PATCH api/users update user
router.patch("/api/products/:id", auth, updateProduct);

// DELETE api/users delete user
router.delete("/api/products/:id", auth, deleteProduct);

export default router;
