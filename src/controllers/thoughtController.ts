import { Request, Response } from "express";

import { thoughtValidation } from "../validation/thoughtValidation";
import prisma from "../config/prismaConfig";

const handleNewThought = async (req: Request, res: Response) => {
	console.log("new thought");
	// validation
	const { isPublic, thought } = req.body;
	const { id } = req.user;

	try {
		thoughtValidation.validateAsync({ ...req.body });
	} catch (err) {
		return res.status(400).json("bad request");
	}

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) return res.status(401).json("unauthorized access");

	const createUser = await prisma.thought.create({
		data: {
			thought,
			isPublic,
			userId: user.id,
		},
	});

	return res.json(createUser);
};

const handleGetThoughts = async (req: Request, res: Response) => {
	console.log("getting all thoughts");

	const thoughts = await prisma.thought.findMany();
	return res.json(thoughts);
};

export { handleNewThought, handleGetThoughts };
