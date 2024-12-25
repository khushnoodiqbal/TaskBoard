const { models } = require("../index");
module.exports = {
  createTask: async (body) => {
    try {
      const data = await models.tasks.create({ ...body });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  getallTask: async () => {
    try {
      const data = await models.tasks.findAndCountAll({
        // attributes:["userId","name","username","email"],
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  updateTask: async ({ taskId, ...body }) => {
    try {
      const data = await models.tasks.update(
        { ...body },
        { where: { taskId: taskId } }
      );
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  getTask: async ({ taskId }) => {
    try {
      const data = await models.tasks.findOne({
        where: { taskId: taskId },
        // attributes:["userId","name","username","email"],
        attributes: {
          exclude: ["deletedAt"],
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

  deleteTask: async ({ taskId }) => {
    try {
      const data = await models.tasks.destroy({
        where: { taskId: taskId },
        force: true,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },
};
