import { SHOW_LOGIN_MODAL } from 'src/actions/cards';
import { CLOSE_MODAL } from 'src/actions/login';
const initialState = {
  displayed: false,
};

const loginModal = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { ...state, displayed: true };
    case CLOSE_MODAL:
      return {...state, displayed: false};
    default:
      return state;
  }
};

export default loginModal;
