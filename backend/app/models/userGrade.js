const Sequelize = require("sequelize");
const sequelize = require("../database");

class UserGrade extends Sequelize.Model {}

UserGrade.init(
  {
    name: Sequelize.STRING,
    point: Sequelize.INTEGER,
  },
  {
    sequelize,
    tableName: "user_grade",
  }
);

module.exports = UserGrade;
