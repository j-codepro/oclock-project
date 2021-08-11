
import { SHOW_MORE_RESULTS, PAGINATION_RESET } from 'src/actions/moreResults';

const initialState = {
  page: 1,
};

const moreResults = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MORE_RESULTS:
      // console.log('state.page', state.page);
      return {...state, page: state.page + 1}
    case PAGINATION_RESET:
      return {...state, page: 1}
    default:
      return state;
  }
};

export default moreResults;
