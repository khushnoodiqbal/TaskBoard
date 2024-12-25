const joi = require("joi");

const createValidation = joi.object({
  name: joi.string().min(3).max(50).required(),
  username: joi.string().min(4).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(18).required(),
  role:joi.string().min(3).max(15).required(),
});

const updateValidation = joi.object({
  userId: joi.string().max(80).required(),
  name: joi.string().min(3).max(50).required(),
  username: joi.string().min(4).max(30).required(),
  email: joi.string().email().required(),
  role: joi.string().required(),
});

const DeleteValidation = joi.object({
  userId: joi.string().min(4).max(64).required(),
});

const getValidation = joi.object({
  username: joi.string().max(64).required(),
  userId: joi.string().max(34).required(),
});

const createUser = async (req, res, next) => {
  try {
    await createValidation.validateAsync(req.body);
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


const getUser = async (req, res, next) => {
  try {
    await getValidation.validateAsync(req.query);
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

const updateUser = async (req, res, next) => {
  try {
    await updateValidation.validateAsync(req.body);

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
const DeleteUser = async (req, res, next) => {
  try {
    await DeleteValidation.validateAsync(req.query);
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
module.exports = { createUser, updateUser, DeleteUser, getUser };
