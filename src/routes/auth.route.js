import {Router} from "express";
import {postLogin, postLogout} from "../controllers/auth.controller.js";
const router = new Router();

// login user
router.post("/api/login", postLogin);

// logout user
router.post("/api/logout", postLogout);

export default router;
