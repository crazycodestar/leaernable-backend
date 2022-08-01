import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

const generateAccessToken = (id: number) =>
	jwt.sign({ id: id }, accessTokenSecret, {
		expiresIn: "1h",
	});

const generateRefreshToken = (id: number) =>
	jwt.sign({ id: id }, refreshTokenSecret, { expiresIn: "1d" });
export { generateAccessToken, generateRefreshToken };
