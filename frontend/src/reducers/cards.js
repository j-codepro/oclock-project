import { SAVE_ACTIVITIES, SAVE_ALL_ACTIVITIES } from 'src/actions/cards';

const initialState = {
  count: 0,
  activities: [],
};

const cards = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_ACTIVITIES:
      return {
        ...state,
        count: action.data.count,
        activities: [...action.data.activities],
      };
    case SAVE_ALL_ACTIVITIES:
      return {
        ...state,
        count: action.data.count,
        activities: [...state.activities, ...action.data.activities],
      };
    default:
      return state;
  }
};

export default cards;
