import express from "express";
import {
	handleLogin,
	handleLogout,
	handleRefreshToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);

export default router;
