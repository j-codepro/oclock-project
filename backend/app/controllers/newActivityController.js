const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const Op = Sequelize.Op;

const { Activity, User, UserGrade } = require('../models');

const newActivityController = {
  createNewActivity: async (req, res) => {
    console.log('controller');
    try {
      const sport_id = parseInt(req.body.sport_id);
      const min_participant = parseInt(req.body.min_participant);
      const { title, description, creator_id, date, time, duration } = req.body;
      const dataPlace = req.body.place;
      // console.log('---------->dataplace', dataPlace);
      // console.log('------------------>zipcode', dataPlace.zip_code);
      // console.log('------------>', sport_id);



      // console.log('-------------------> 0 creator_id', creator_id);



      // On crée la nouvelle activité :
      const newActivity = await Activity.create(
        {
          title,
          description,
          date,
          time,
          duration,
          min_participant,
          creator_id,
          activity_status_id: 3,
          participant_count: 1,
          sport_id,
          activity_place: {
            adress: `${dataPlace.number} ${dataPlace.street}`,
            city: dataPlace.city,
            zip_code: dataPlace.zip_code,
            region: dataPlace.region,
            lat: dataPlace.latitude,
            lng: dataPlace.longitude,
            private: false,
            indoor: false,
          },
        },
        { include: ['activity_place'] },
      );


      // console.log('-------------------> 1');

      const user = await User.findByPk(creator_id);

      // console.log('-------------------> 1', user);

      // ajoute les points motiv 
      // console.log('---------->user', user.dataValues.reward_count);

      const new_reward_count = user.dataValues.reward_count + 100;
      user.reward_count = new_reward_count;

      // console.log('-------------------> 3 new_reward_count', new_reward_count);
      
      // on verif à quel user_grade corresponde les points
      const grades = await UserGrade.findAll({
        where: {
          point: {
            [Op.lte]: new_reward_count,
          }
        },
        order: [['point', 'DESC']],
      });

      // console.log('-------------------> 4 grades', grades);

      user.user_grade_id = grades[0].id;

      // console.log('-------------------> 5 user.user_grade_id', user.user_grade_id);

      await user.save();
      await newActivity.addUser(user);

      // console.log('-------------------> 6 END');

      res.status(201).send('newActivity well created');
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = newActivityController;
