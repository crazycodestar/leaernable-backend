import express from "express";

import { handleRegister } from "../controllers/userController";

const router = express.Router();

router.route("/").post(handleRegister);

export default router;
