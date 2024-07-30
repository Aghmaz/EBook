const Joi = require("joi");

// Schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// Schema for user login
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// Schema for books
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().optional(),
  genre: Joi.string().optional(),
  publishedYear: Joi.number().integer().optional(),
});
module.exports = { registerSchema, loginSchema, bookSchema };
