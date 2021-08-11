const dayjs = require("dayjs");
require("dayjs/locale/fr");

const formatDate = (date) => {
  const newDate = dayjs(date).locale("fr").format("D MMM YYYY");
  return newDate;
};

const formatTime = (time) => {
  const newTime = time.split(":").slice(0, 2).join(":");
  return newTime;
};

module.exports = { formatDate, formatTime };
