import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { registerValidation } from "../validation/userValidation";
import prisma from "../config/prismaConfig";
import { Prisma } from "@prisma/client";

const handleRegister = async (req: Request, res: Response) => {
	// validation
	const { username, email, password } = req.body;

	try {
		await registerValidation.validateAsync({ ...req.body });
	} catch (error) {
		return res.status(400).json("bad request");
	}

	const encryptedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: {
				username: username,
				email: email,
				password: encryptedPassword,
			},
		});
		return res.status(201).json(user);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				const duplicateInfo = (err.meta?.target as string).split("_")[1];
				return res.status(409).json({
					error: `${duplicateInfo} already in use`,
					duplicate: duplicateInfo,
				});
			}
		}
		throw err;
	}
};

export { handleRegister };
