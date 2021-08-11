import axios from 'axios';
import {
  SEND_ACTIVITY_INFORMATION,
  //saveCreationActivityInfo,
  FETCH_SPORTS,
  saveSports,
  errorNotFoundPlace,
  activityCreated,
} from 'src/actions/creationPage';

import {
  fetchUserActivities,
} from 'src/actions/cards';

const apiKey = '82a0b22e81932aad65c97e8bcc2f192a';

const creationPage = (store) => (next) => (action) => {
  switch (action.type) {

    case SEND_ACTIVITY_INFORMATION:
      {
        // console.log('sendActivityInformation')
        const { creationPage, login } = store.getState();
        // console.log('sport_id', creationPage.sport_id);
        // console.log('idUser', login.user.id);
        // console.log('adress TEST ', creationPage.adress);

        //console.log('sendActivityInformation', creationPage, login);
        
        axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=${apiKey}&country=FR&limit=1&query=${creationPage.adress},${creationPage.zip_code},${creationPage.city}`,
          )
          .then((response) => {
            
            // console.log("response apiPlace", response.data);
            const responseApiPlace = response.data.data[0];

            if(!responseApiPlace || !responseApiPlace.name) {
              console.log('error')
              store.dispatch(errorNotFoundPlace("il n'existe pas de lieu à ce nom, veuillez réssayer" ));
              return;
            }

            // console.log(
            //   'responseapiPlace.postal_code',
            //   responseApiPlace.postal_code,
            // );

            /*
            // avec token stocké dans le local storage
            let token;
            if (localStorage.fairplayUser) {
              const user = JSON.parse(localStorage.fairplayUser);
              token = user.token;
            } else {
              return;
            }
            console.log('token ----> ', token);
            */

            axios
              .post(`${process.env.API_URL}/api/newactivity`, {
                title: creationPage.title,
                description: creationPage.description,
                date: creationPage.date,
                time: creationPage.time,
                duration: creationPage.duration,
                min_participant: creationPage.min_participant,
                creator_id: login.user.id,
                place: {
                  city: responseApiPlace.locality,
                  number: responseApiPlace.number,
                  street: responseApiPlace.street,
                  zip_code: responseApiPlace.postal_code,
                  region: responseApiPlace.region,
                  latitude: responseApiPlace.latitude,
                  longitude: responseApiPlace.longitude,
                },
                activity_status_id: 3,
                sport_id: creationPage.sport_id,
              },
              // pour set/get cookies /!\
              { withCredentials: true }
              // pour passer token de localStorage
              /*, {
                headers: {
                  //Authorization: `bearer ${state.user.token}`,
                  // recup token in localStorage
                  Authorization: `bearer ${token}`,
                }
              }*/)
              .then((response)=> {
                store.dispatch(activityCreated());
                store.dispatch(fetchUserActivities());
              });
          })
          .catch((error) => {
            if(error.response.status === 401) {
              store.dispatch(disconnect());
            }
            console.log(error);
          });
      }
      break;


    case FETCH_SPORTS:
      axios
        .get(`${process.env.API_URL}/api/sports`, {})
        .then((response) => {
          // console.log('fetchsport response', response.data)
          store.dispatch(saveSports(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
      next(action);
  }
};

export default creationPage;
