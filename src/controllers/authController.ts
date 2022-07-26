import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

import { loginValidation } from "../validation/authValidation";
import prisma from "../config/prismaConfig";
import redisClient from "../config/redisConfig";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../config/tokenConfig";

dotenv.config();
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

type tokenObject = { username: string };

const handleLogin = async (req: Request, res: Response) => {
	const { username: userUnique, password } = req.body;

	try {
		await loginValidation.validateAsync({ userUnique, password });
	} catch (error) {
		return res.status(400).json("Bad request");
	}

	let user = await prisma.user.findFirst({
		where: {
			OR: [{ email: userUnique }, { username: userUnique }],
		},
	});
	if (!user) return res.status(404).json("user not found");
	const match = await bcrypt.compare(password, user.password);
	if (!match) return res.status(401).json("invalid username or password");

	const accessToken = generateAccessToken(user.username);
	const refreshToken = generateRefreshToken(user.username);

	const expiresIn = 24 * 60 * 60;
	redisClient.setEx(user.username, expiresIn, refreshToken);

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});
	return res.json({ accessToken });
};

const handleRefreshToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken: string = cookies.jwt;
	let user = null;

	try {
		user = await jwt.verify(refreshToken, refreshTokenSecret);
		const data = await redisClient.get((user as tokenObject).username);
		if (data !== refreshToken) return res.sendStatus(403);
	} catch (err) {
		return res.sendStatus(403);
	}

	const accessToken = generateAccessToken((user as tokenObject).username);
	return res.json({ accessToken });
};

const handleLogout = async (req: Request, res: Response) => {
	// client: delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	const refreshToken = cookies.jwt;

	try {
		const user = await jwt.verify(refreshToken, refreshTokenSecret);
		if (user) await redisClient.del((user as tokenObject).username);
		// clearr cookie
		res.clearCookie("jwt", { httpOnly: true });
	} catch (err) {
		// clearr cookie
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(204);
	}

	return res.sendStatus(204);
};

export { handleLogin, handleRefreshToken, handleLogout };
