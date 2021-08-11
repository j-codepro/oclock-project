import {
  SAVE_SEARCHED_ACTIVITIES,
  SAVE_ALL_SEARCHED_ACTIVITIES,
  FETCH_ACTIVITIES_BY_LOCALISATION,
  FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS
} from 'src/actions/search';

const initialState = {
  count: 0,
  activities: [],
  loaded: false,
};

const search = (state = initialState, action = {}) => {
  switch (action.type) {

    case SAVE_SEARCHED_ACTIVITIES:
      return {
        ...state,
        count: action.data.count,
        activities: [...action.data.activities],
        loaded: true,
      };

    case SAVE_ALL_SEARCHED_ACTIVITIES: 
      return {
        ...state,
        count: action.data.count,
        activities: [...state.activities, ...action.data.activities],
        loaded: true,
      };

    default:
      return state;
  }
};

export default search;
