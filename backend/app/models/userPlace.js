const Sequelize = require("sequelize");
const sequelize = require("../database");

class UserPlace extends Sequelize.Model {}

UserPlace.init(
  {
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    zip_code: Sequelize.STRING,
    department: Sequelize.STRING,
    region: Sequelize.STRING,
    google_place_key: Sequelize.STRING,
    lat: Sequelize.DOUBLE,
    lng: Sequelize.DOUBLE,
    created_at: Sequelize.STRING,
    updated_at: Sequelize.STRING
  },
  {
    sequelize,
    tableName: "user_place",
  }
);

module.exports = UserPlace;
