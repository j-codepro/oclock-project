const Sequelize = require("sequelize");
const sequelize = require("../database");

class Sport extends Sequelize.Model {}

Sport.init(
  {
    name: Sequelize.STRING,
    icon: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: "sport",
  }
);

module.exports = Sport;
