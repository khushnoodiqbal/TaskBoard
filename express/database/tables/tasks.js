const { Model, DataTypes } = require("sequelize");

const sequelize = require("../dbConnections");
const { v4: uuid } = require("uuid");

class tasks extends Model {}
tasks.init(
  {
    taskId: {
      type: DataTypes.STRING(80),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(80),
      allowNull: false,
      // defaultValue: "abc",
    },
    stage: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    //timestamps: true,
    paranoid: true,
    sequelize,
  }
);
tasks.beforeCreate(async (task) => {
    task.taskId = uuid();
});
module.exports = tasks;
