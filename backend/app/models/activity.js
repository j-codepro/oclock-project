const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Activity extends Model {}

Activity.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    illustration: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    duration: DataTypes.TIME,
    participant_count: DataTypes.INTEGER,
    min_participant: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "activity",
  }
);

module.exports = Activity;
