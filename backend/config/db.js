const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_NAME
    : process.env.DBNAME;

const sequelize = new Sequelize(
  dbName,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
