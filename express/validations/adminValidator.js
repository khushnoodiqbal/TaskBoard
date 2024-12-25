const joi = require("joi");

const createValidation = joi.object({
  name: joi.string().min(3).max(50).required(),
  adminname: joi.string().min(4).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(18).required(),
});

const updateValidation = joi.object({
  adminId: joi.string().max(64).required(),
  name: joi.string().min(3).max(50).required(),
  adminname: joi.string().min(4).max(30).required(),
  email: joi.string().email().required(),
});

const DeleteValidation = joi.object({
  adminId: joi.string().min(4).max(64).required(),
});

const getValidation = joi.object({
  adminname: joi.string().max(64).required(),
  adminId: joi.string().max(34).required(),
});

const createAdmin = async (req, res, next) => {
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

const getAdmin = async (req, res, next) => {
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

const updateAdmin = async (req, res, next) => {
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
const DeleteAdmin = async (req, res, next) => {
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
module.exports = { createAdmin, updateAdmin, DeleteAdmin, getAdmin };
