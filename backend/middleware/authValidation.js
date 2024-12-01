const joi = require("joi");
const user = require("../models/user");

module.exports.registerValidation = (req, res, next) => {
  const User = joi.object({
    userName: joi.string().min(3).max(30).required(),
    password: joi.string().min(4).max(100).required(),
    email: joi.string().email().required(),
  });
  const { error } = User.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      error: error.details[0]["message"],
      Description: error,
    });
  }
  next();
};

module.exports.loginValidation = (req, res, next) => {
  const User = joi.object({
    userName: joi.string().min(3).max(30).required(),
    password: joi.string().min(4).max(100).required(),
  });
  const { error } = User.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      error: error.details[0]["message"],
      Description: error,
    });
  }
  next();
};
