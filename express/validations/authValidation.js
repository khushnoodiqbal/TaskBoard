const joi = require("joi");
const responseHandler = require("../responseHandler");

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(18).required(),
});

const Login = async (req, res, next) => {
  try {
    await loginValidation.validateAsync(req.body);
    next();
  } catch (error) {
    return res.send({
        status: 400,
        message: "Validation Errors",
        data: {},
        error: error.message,
      });

  }
};
module.exports = { Login };
