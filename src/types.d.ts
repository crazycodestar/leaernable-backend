import { Request } from "express";

type ROLES = "USER" | "ADMIN" | "TEACHER";

declare global {
	namespace Express {
		interface Request {
			user: null | {
				id: number;
				roles: ROLES;
			};
		}
	}
}
