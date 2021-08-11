const Sequelize = require("sequelize");
const sequelize = require("../database");

class Message extends Sequelize.Model {}

Message.init(
  {
    comment: Sequelize.STRING,
    user_id: Sequelize.NUMBER,
    activity_id: Sequelize.NUMBER,
  },
  {
    sequelize,
    tableName: "message",
  }
);

module.exports = Message;
