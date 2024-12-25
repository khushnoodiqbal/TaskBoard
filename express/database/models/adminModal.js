const { models } = require("../index");
module.exports = {
  createAdmin: async (body) => {
    try {
      const data = await models.admins.create({ ...body });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  getallAdmin: async () => {
    try {
      const data = await models.admins.findAndCountAll({
        // attributes:["userId","name","username","email"],
        attributes: {
          exclude: ["password"],
        },
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  updateAdmin: async ({ adminId, ...body }) => {
    try {
      const data = await models.admins.update(
        { ...body },
        { where: { adminId: adminId } }
      );
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  getAdmin: async ({ adminname, adminId }) => {
    try {
      const data = await models.admins.findOne({
        where: {
          ...(adminname == "false"
            ? { adminId: adminId }
            : { adminname: adminname }),
        },
        // attributes:["userId","name","username","email"],
        attributes: {
          exclude: ["password", "deletedAt"],
        },
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  deleteAdmin: async ({ adminId }) => {
    try {
      const data = await models.admins.destroy({
        where: { adminId: adminId },
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },
};
