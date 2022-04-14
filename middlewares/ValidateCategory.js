const Joi = require('joi');
const StatusCodes = require('http-status-codes');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  next();
};

module.exports = {
  validateCategory,
};