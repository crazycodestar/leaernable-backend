import { NextFunction, Request, Response } from "express";
import { whitelist } from "../config/corsConfig";

const credentials = (req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin;
	if (!origin) return next();

	if (whitelist.includes(origin)) {
		res.set("Access-Control-Allow-Credentials", "true");
	}
	next();
};

export default credentials;
