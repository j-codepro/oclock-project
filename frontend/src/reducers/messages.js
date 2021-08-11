import { SAVE_ACTTIVITY, SAVE_NEW_MESSAGE } from 'src/actions/details';

const initialState = [];

const messages = (state = initialState, action = {}) => {
  switch (action.type) {

    case SAVE_ACTTIVITY:
      return [...action.data.messages];

    case SAVE_NEW_MESSAGE:
      return [action.message, ...state];

    default:
      return state;
  }
};

export default messages;