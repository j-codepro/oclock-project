const Sequelize = require("sequelize");
const sequelize = require("../database");

class ActivityStatus extends Sequelize.Model {}

ActivityStatus.init(
  {
    name: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: "activity_statut",
  }
);

module.exports = ActivityStatus;
