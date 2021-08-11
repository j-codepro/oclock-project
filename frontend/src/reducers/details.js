import { SAVE_ACTTIVITY, UPDATE_STATUS, ERROR_STATUS } from 'src/actions/details';

const initialState = {
  classname: '',
  joinMessage: 'Rejoindre',
  quitMessage: "Quitter l'activité",
  errorMessage: '',
  messages: [],
};

const details = (state = initialState, action = {}) => {
  switch (action.type) {
    case ERROR_STATUS:
      return {
        ...state,
        classname: 'error',
        errorMessage: 'ERROR',
      };
    case UPDATE_STATUS:
      if (action.operateur === '+') {
        return {
          ...state,
          errorMessage: '',
          classname: '',
          participant_count: state.participant_count + 1,
        };
      }
      return {
        ...state,
        errorMessage: '',
        classname: '',
        participant_count: state.participant_count - 1,
      };
    case SAVE_ACTTIVITY:
      return {
        ...initialState,
        ...action.data,
      };
    default:
      return state;
  }
};

export default details;
