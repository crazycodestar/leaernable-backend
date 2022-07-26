import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import auth from "./routes/auth";
import user from "./routes/user";
import prisma from "./config/prismaConfig";
import redisClient from "./config/redisConfig";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

redisClient.on("error", (err) => console.log("redis client error", err));

const main = async () => {
	await redisClient.connect();

	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());

	app.use("/auth", auth);
	app.use("/user", user);

	app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect;
	});
// app.use("/users", )
