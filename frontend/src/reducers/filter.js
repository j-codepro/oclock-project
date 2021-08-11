import { SAVE_FILTER_SPORT } from 'src/actions/filter';

const initialState = {
  sports: [],
};

const filter = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FILTER_SPORT:
      return {
        ...state,
        sports: [...action.data],
      };
    default:
      return state;
  }
};

export default filter;
