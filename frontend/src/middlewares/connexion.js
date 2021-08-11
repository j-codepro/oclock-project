import axios from 'axios';
import {
  FETCH_LOGIN,
  GET_USER,
  LOG_OUT,
  DISCONNECT,
  saveConnexionStatut,
  loginError,
} from 'src/actions/login';

//import { fetchUserActivities } from 'src/actions/cards';

const connexion = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LOGIN: {
      const { login } = store.getState();
      // console.log('gg');
      axios
        .post(
          `${process.env.API_URL}/api/connexion`, 
          {
            email: login.email,
            password: login.password,
          },
          // pour set/get cookies /!\
          { withCredentials: true },
        )
        .then((response) => {
          // console.log('response', response.data);

          store.dispatch(saveConnexionStatut(response.data));
          //store.dispatch(fetchUserActivities());

          localStorage.fairplayUser = JSON.stringify({
            firsname: response.data.firsname,
            id: response.data.id,
            lastname: response.data.lastname,
            pseudo: response.data.pseudo,
            points: response.data.points,
          });
        })
        .catch((error) => {
          console.log('error', error);
          store.dispatch(loginError());
        });
      break;
    }

    case GET_USER:
      if (localStorage.fairplayUser) {
        const user = JSON.parse(localStorage.fairplayUser);
        store.dispatch(saveConnexionStatut(user));
        //store.dispatch(fetchUserActivities());
      }
      break;

    case LOG_OUT:
      if (localStorage.fairplayUser) {
        localStorage.removeItem('fairplayUser');
      }
      break;

    case DISCONNECT:
      if (localStorage.fairplayUser) {
        localStorage.removeItem('fairplayUser');
      }
      // laisse passer l'action pour DISCONNECT aussi dans le reducer login.js ( suppr le user aussi du state )
      next(action);
      break;

    default:
      next(action);
  }
};

export default connexion;
