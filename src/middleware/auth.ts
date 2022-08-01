import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET } from "../config/environment";

const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearer = req.headers.authorization;

	if (!bearer) return res.status(401).send("unauthorized access");

	const token = bearer.split(" ")[1];
	try {
		const user = await jwt.verify(token, ACCESS_TOKEN_SECRET);
		req.user = user;
	} catch (err) {
		console.log("token error", err);
	}
	return next();
};

export default authentication;
