const { response } = require("../app");
const { createTask, getallTask , getTask , updateTask ,deleteTask} = require("../database/models/tasks");
const responseHandler = require("../responseHandler");
// const create = (req, res) => {
//   console.log(req.body);
//   return res.send({
//     message: "respond with a resource",
//     data: req.body,
//   });
// };
const create = async (req, res) => {
  try {
    const user = await createTask(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};
const getALL = async (req, res) => {
  try {
    const user = await getallTask();
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const get = async (req, res) => {
  try {
    const user = await getTask(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const update = async (req, res) => {
  try {
    const user = await updateTask(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const Delete = async(req, res) => {
  try {
    const user = await deleteTask(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

module.exports = { create, getALL, update, Delete , get };
