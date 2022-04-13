const Joi = require('joi');
const StatusCodes = require('http-status-codes');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required,
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().uri().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
     message: error.message,
    });
  }
  return next();
};

module.exports = {
  validateUser,
};
