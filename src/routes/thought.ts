import express from "express";
import {
	handleGetThoughts,
	handleNewThought,
} from "../controllers/thoughtController";
import authentication from "../middleware/auth";

const router = express.Router();

router.post("/", authentication, handleNewThought);
router.get("/", handleGetThoughts);

export default router;
