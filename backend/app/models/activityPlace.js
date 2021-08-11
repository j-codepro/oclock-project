const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class ActivityPlace extends Model {}

ActivityPlace.init(
  {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    department: DataTypes.STRING,
    region: DataTypes.STRING,
    google_place_key: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    private: DataTypes.BOOLEAN,
    indoor: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    tableName: "activity_place",
  }
);

module.exports = ActivityPlace;
