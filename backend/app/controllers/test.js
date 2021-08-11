//const { Activity, ActivityPlace } = require("../models");
const { User, Sport } = require("../models");

const test = {
  getAllActivityWithPlace: async (req, res) => {
    try {
      const activities = await User.findAll({
        include: "sports",
      });

      if (!activities) {
        res.defaultStatus(404).json("Error : can't find Activity");
      } else {
        res.json(activities);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = test;
