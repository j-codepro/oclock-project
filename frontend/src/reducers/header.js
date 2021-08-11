import { SAVE_CONNEXION_STATUT, DISCONNECT } from 'src/actions/login';

const initialState = {
  isLogged: false,
  //isLogged: true
};

const header = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_CONNEXION_STATUT:
      return {
        isLogged: true,
      };
    case DISCONNECT:
      return initialState;
    default:
      return state;
  }
};

export default header;
