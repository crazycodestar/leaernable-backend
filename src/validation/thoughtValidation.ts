import Joi from "joi";

const thoughtValidation = Joi.object({
	isPublic: Joi.boolean().required(),
	thought: Joi.string().min(10).max(1024),
});

export { thoughtValidation };
