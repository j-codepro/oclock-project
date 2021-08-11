
const { formatDate, formatTime } = require('./formatDate');

const formatActivity = (activity) => {
  return {
    ...activity.dataValues,
    date: formatDate(activity.date),
    time: formatTime(activity.time),
    duration: formatTime(activity.duration),
    messages: activity.messages.map((message) => {
      return {
        ...message.dataValues,
        created_at: formatDate(message.created_at),
      }
    })
  }
};

const formatActivities = (activities) => {
  return formatedaActivities = activities.map((activity) => {
    return {
      ...activity.dataValues,
      date: formatDate(activity.date),
      time: formatTime(activity.time),
      duration: formatTime(activity.duration),
    }
  });
};

const formatActivitiesFilterByDistance = (activities, distance) => {
  const formatedaActivities = [];
  activities.forEach((activity) => {
    if (activity.activity_place.dataValues.distance < distance) {
      formatedaActivities.push({
        ...activity.dataValues,
        date: formatDate(activity.date),
        time: formatTime(activity.time),
        duration: formatTime(activity.duration),
      });
    }
  })
  return formatedaActivities;
};

module.exports = { formatActivities, formatActivity, formatActivitiesFilterByDistance };
