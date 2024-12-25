const { models } = require("../index");
module.exports = {
  createUser: async (body) => {
    try {
      const data = await models.users.create({ ...body });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  getallUser: async () => {
    try {
      const data = await models.users.findAndCountAll({
        // attributes:["userId","name","username","email"],
        // attributes: {
        //   exclude: ["password"],
        // },
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  updateUser: async ({ userId, ...body }) => {
    try {
      const data = await models.users.update(
        { ...body },
        { where: { userId: userId } }
      );
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  // getUser: async ({ username, userId }) => {
  //   try {
  //     const data = await models.users.findOne({
  //       where: {
  //         ...(username == "false"
  //           ? { userId: userId }
  //           : { username: username }),
  //       },
  //       // attributes:["userId","name","username","email"],
  //       // attributes: {
  //       //   exclude: ["password", "deletedAt"],
  //       // },
  //       paranoid: false,
  //     });
  //     return {
  //       data: data,
  //     };
  //   } catch (error) {
  //     return { error: error.error[0].message };
  //   }
  // },
  getUser: async ({ email, userId }) => {
    try {
      const data = await models.users.findOne({
        where: {
          ...(email == "false"
            ? { userId: userId }
            : { email: email }),
        },
        // attributes:["userId","name","username","email"],
        // attributes: {
        //   exclude: ["password", "deletedAt"],
        // },
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.error[0].message };
    }
  },

  deleteUser: async ({ userId }) => {
    try {
      const data = await models.users.destroy({
        where: { userId: userId },
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
