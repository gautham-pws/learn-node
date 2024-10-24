import {Router} from "express";
import {postLogin, postLogout} from "../controllers/auth.controller.js";
const router = new Router();
import auth from "../middleware/auth.js";

// login user
router.post("/api/login", postLogin);

// logout user
router.post("/api/logout", auth, postLogout);

export default router;
