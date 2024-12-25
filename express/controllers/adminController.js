const responseHandler = require("../responseHandler");
const { createAdmin, getallAdmin , getAdmin , updateAdmin ,deleteAdmin} = require("../database/models/adminModal");


module.exports = {
  create: async(req, res) => {
    try {
      const admin = await createAdmin(req.body);
      console.log(req.body)
      return responseHandler(res, admin);
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },

  getAll: async(req, res) => {
    try {
      const admin = await getallAdmin();
      return responseHandler(res, admin);
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
  get: async(req, res) => {
    try {
      const admin = await getAdmin(req.query);
      return responseHandler(res, admin);
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
  update: async(req, res) => {
    try {
      const admin = await updateAdmin(req.body);
      return responseHandler(res, admin);
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
  Delete: async(req, res) => {
    try {
      const admin = await deleteAdmin(req.query);
      return responseHandler(res, admin);
    } catch (error) {
      return responseHandler(res, { error: error });
    }
  },
};
