const express = require('express');
const router = express.Router();

// const test = require("./controllers/test");
const activityController = require('./controllers/activityController');
const connectionController = require('./controllers/connectionController');
const sportsController = require('./controllers/sportsController');
const newActivityController = require('./controllers/newActivityController');
const registrationController = require("./controllers/registrationController");
const messageController = require("./controllers/messageController");
const joinActivityController = require("./controllers/joinActivityController");
const quitActivityController = require("./controllers/quitActivityController");
const authorizationMiddleware = require("./middleware/authorization");

router.get('/', (req, res) => { res.send('hello') });

router.post('/api/newactivity', authorizationMiddleware, newActivityController.createNewActivity);

router.post('/api/registration', registrationController.addUser);
router.post('/api/connexion', connectionController.getUser);

//homepage user not connected
router.get('/api/activities?', activityController.getLastActivities);

router.post('/api/activity/join',authorizationMiddleware,joinActivityController.joinActivity);

router.post('/api/activity/quit', authorizationMiddleware, quitActivityController.quitActivity);

router.get('/api/activity/:id', authorizationMiddleware, activityController.getOneActivity); 

//homepage user not connected searched by any place (google map API)
router.get('/api/place?', activityController.getActivitiesByUserLocalisation);

router.get('/api/activities/user/:id', authorizationMiddleware, activityController.getActivitiesByUser);

router.get('/api/sports', sportsController.getSports);

router.get('/api/sports/localisation?',sportsController.getSportsByLocalisation,);

router.get('/api/activities/sports?', activityController.getActivitesByUserLocalisationAndSports,);

router.post('/api/activity/:id/messages/',authorizationMiddleware, messageController.addMessageToActivity);

router.use((req, res) => { res.status(404).send('Service does not exists here ...') });

module.exports = router;
