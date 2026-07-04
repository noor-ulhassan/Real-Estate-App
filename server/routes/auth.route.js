import express from "express";
import { signUp, login, googleAuth, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/logout", logout);

export default router;
