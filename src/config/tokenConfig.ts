import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

const generateAccessToken = (username: string) =>
	jwt.sign({ username: username }, accessTokenSecret, {
		expiresIn: "1h",
	});

const generateRefreshToken = (username: string) =>
	jwt.sign({ username: username }, refreshTokenSecret, { expiresIn: "1d" });
export { generateAccessToken, generateRefreshToken };
