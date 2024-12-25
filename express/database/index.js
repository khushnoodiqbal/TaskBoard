const sequelize = require("./dbConnections");

const users = require("./tables/users");
const admins = require("./tables/admin");
const tasks = require("./tables/tasks");

const models = { users, admins, tasks };
sequelize.models = models;

module.exports = { sequelize, models };
