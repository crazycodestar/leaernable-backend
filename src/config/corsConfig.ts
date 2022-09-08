import { CorsOptions } from "cors";

export const whitelist = [
	"https://www.yousite.com",
	"http://localhost:3000",
	"http://localhost:5000",
];

export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(new Error("not allowed by CORS"));
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
