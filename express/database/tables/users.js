const { Model, DataTypes } = require("sequelize");

const sequelize = require("../dbConnections");
const { v4: uuid } = require("uuid");

const { hash } = require("bcryptjs");

class users extends Model {}
users.init(
  {
    userId: {
      type: DataTypes.STRING(80),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      // defaultValue: "abc",
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
    },
  },
  {
    //timestamps: true,
    paranoid: true,
    sequelize,
  }
);
users.beforeCreate(async (user) => {
  user.userId = uuid();
  user.password = await hash(user.password, 10);
});
users.afterCreate(async(user)=>{
  delete user.dataValues.password;
})


module.exports = users;
