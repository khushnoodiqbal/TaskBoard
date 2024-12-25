const { response } = require("../app");
const { createUser, getallUser , getUser , updateUser ,deleteUser} = require("../database/models/userModal");
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
    const user = await createUser(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};
const getALL = async (req, res) => {
  try {
    const user = await getallUser();
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const get = async (req, res) => {
  try {
    const user = await getUser(req.query);
    delete user.data.dataValues.password;
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const update = async (req, res) => {
  try {
    const user = await updateUser(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const Delete = async(req, res) => {
  try {
    const user = await deleteUser(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

module.exports = { create, getALL, update, Delete , get };
