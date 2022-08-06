import Joi from "joi";

const user = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default { user };
