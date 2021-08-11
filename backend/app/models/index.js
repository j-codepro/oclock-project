const Activity = require("./activity");
const ActivityPlace = require("./activityPlace");
const ActivityStatut = require("./activityStatut");
const Message = require("./message");
const Sport = require("./sport");
const User = require("./user");
const UserGrade = require("./userGrade");
const UserPlace = require("./userPlace");

Activity.belongsTo(ActivityPlace, {
  foreignKey: "activity_place_id",
  as: "activity_place",
});

ActivityPlace.hasMany(Activity, {
  foreignKey: "activity_place_id",
  as: "activities",
});

Activity.belongsTo(Sport, {
  foreignKey: "sport_id",
  as: "sport",
});

Sport.hasMany(Activity, {
  foreignKey: "sport_id",
  as: "activities",
});

Activity.belongsTo(ActivityStatut, {
  foreignKey: "activity_status_id",
  as: "activity_statut",
});

ActivityStatut.hasMany(Activity, {
  foreignKey: "activity_status_id",
  as: "activities",
});

Activity.hasMany(Message, {
  foreignKey: "activity_id",
  as: "messages",
});

Message.belongsTo(Activity, {
  foreignKey: "activity_id",
  as: "activity",
});

Sport.belongsToMany(User, {
  foreignKey: "sport_id",
  otherKey: "user_id",
  as: "users",
  through: "user_has_sport",
});

User.belongsToMany(Sport, {
  foreignKey: "user_id",
  otherKey: "sport_id",
  as: "sports",
  through: "user_has_sport",
});

User.belongsToMany(Activity, {
  foreignKey: "user_id",
  otherKey: "activity_id",
  as: "activities",
  through: "user_has_activity",
});

Activity.belongsToMany(User, {
  foreignKey: "activity_id",
  otherKey: "user_id",
  as: "users",
  through: "user_has_activity",
});

User.belongsTo(UserPlace, {
  foreignKey: "user_place_id",
  as: "user_place",
});

UserPlace.hasMany(User, {
  foreignKey: "user_place_id",
  as: "users",
});

User.belongsTo(UserGrade, {
  foreignKey: "user_grade_id",
  as: "user_grade",
});

UserGrade.hasMany(User, {
  foreignKey: "user_grade_id",
  as: "users",
});

User.hasMany(Message, {
  foreignKey: "user_id",
  as: "messages",
});

Message.belongsTo(User, {
  foreignKey: "user_id",
  as: "users",
});

User.hasMany(Activity, {
  foreignKey: "creator_id",
  as: "creator_activities",
});

Activity.belongsTo(User, {
  foreignKey: "creator_id",
  as: "creator",
});

module.exports = {
  Activity,
  ActivityPlace,
  ActivityStatut,
  Message,
  Sport,
  User,
  UserGrade,
  UserPlace,
};
