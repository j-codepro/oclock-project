import axios from 'axios';
import {
  FETCH_REGISTRATION_FORM,
  passwordError,
  emailError,
  pseudoError,
  cityError,
  resetErrors,
} from 'src/actions/registration';
import { saveConnexionStatut } from 'src/actions/login';

const apiKey = '82a0b22e81932aad65c97e8bcc2f192a';

const registration = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_REGISTRATION_FORM: {
      const formData = store.getState().registration;
      store.dispatch(resetErrors());
      if (formData.password !== formData.confirmPassword) {
        store.dispatch(passwordError());
        break;
      } else {
        axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=${apiKey}&country=FR&query=${formData.address},${formData.postalCode},${formData.city}`,
          )
          .then((response) => {
            //console.log('verif position stack REGISTRATION ', response.data);
            const responsePlace = response.data.data[0];
            axios
              .post(`${process.env.API_URL}/api/registration`, {
                pseudo: formData.pseudo,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                firstname: formData.firstname,
                lastname: formData.lastname,
                place: {
                  city: responsePlace.city,
                  number: responsePlace.number,
                  street: responsePlace.street,
                  postal_code: responsePlace.postal_code,
                  region: responsePlace.region,
                  latitude: responsePlace.latitude,
                  longitude: responsePlace.longitude,
                },
                presentation: formData.presentation,
              })
              .then((APIresponse) => {
                console.log('response', APIresponse.data.user);
                localStorage.fairplayUser = JSON.stringify({
                  firsname: APIresponse.data.user.firsname,
                  id: APIresponse.data.user.id,
                  lastname: APIresponse.data.user.lastname,
                  pseudo: APIresponse.data.user.pseudo,
                  points: APIresponse.data.user.points,
                });
                store.dispatch(saveConnexionStatut(APIresponse.data.user));
              })
              .catch((error) => {
                //console.error('error', error.response.data);
                if (error.response.data.error === 'mail') {
                  store.dispatch(emailError());
                } else if (error.response.data.error === 'pseudo') {
                  store.dispatch(pseudoError());
                }
              });
          })
          .catch((error) => {
            store.dispatch(cityError());
            console.error('City ERROR', error);
          });

        break;
      }
    }
    default:
      next(action);
  }
};

export default registration;
