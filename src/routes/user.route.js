import {Router} from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
const router = new Router();
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

// GET api/users get all users, filter by id, email, role
router.get("/api/users", getUsers);

// POST api/users create new user
router.post("/api/users", auth, isAdmin, createUser);

// PATCH api/users update user
router.patch("/api/users/:id", auth, updateUser);

// DELETE api/users delete user
router.delete("/api/users/:id", auth, isAdmin, deleteUser);

export default router;
