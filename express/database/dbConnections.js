require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DAtabase");
  })
  .catch((error) => {
    console.error("Error Connecting to database", error);
  });
module.exports = sequelize;