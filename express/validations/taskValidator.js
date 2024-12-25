const joi = require("joi");

const createValidation = joi.object({
  title: joi.string().min(3).max(100).required(),
  stage: joi.string().min(2).max(30).required(),
  date: joi.string().required(),
  priority: joi.string().min(3).max(18).required(),
//   assigneid:joi.string().min(3).max(15).required(),
});

const updateValidation = joi.object({
  taskId: joi.string().max(80).required(),
  title: joi.string().max(80).required(),
  stage: joi.string().min(2).max(50).required(),
  priority: joi.string().min(3).max(30).required(),
  date: joi.string().required(),
//   assigneid: joi.string().email().required(),
});

const DeleteValidation = joi.object({
  taskId: joi.string().min(4).max(64).required(),
});

const getValidation = joi.object({
  taskId: joi.string().max(80).required(),
});

const createTask = async (req, res, next) => {
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


const getTask = async (req, res, next) => {
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

const updateTask = async (req, res, next) => {
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
const DeleteTask = async (req, res, next) => {
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
module.exports = { createTask, updateTask, DeleteTask, getTask };
