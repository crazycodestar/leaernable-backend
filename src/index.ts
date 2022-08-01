import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import prisma from "./config/prismaConfig";
import redisClient from "./config/redisConfig";
import { PORT } from "./config/environment";
// routes
import auth from "./routes/auth";
import user from "./routes/user";
import thought from "./routes/thought";

dotenv.config();
const app = express();

redisClient.on("error", (err) => console.log("redis client error", err));
// COMMENTS HERE

const main = async () => {
	await redisClient.connect();

	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());

	app.use("/auth", auth);
	app.use("/user", user);
	app.use("/thought", thought);

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
