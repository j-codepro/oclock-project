import axios from 'axios';
import {
  FETCH_FILTER_SPORTS,
  FETCH_FILTER_SPORTS_BY_LOCALISATION,
  saveFilterSports
} from 'src/actions/filter';

const filter = (store) => (next) => (action) => {
  switch (action.type) {

    case FETCH_FILTER_SPORTS:
      axios
        .get(`${process.env.API_URL}/api/sports`)
        .then((response) => {
          // console.log('response', response.data);
          store.dispatch(saveFilterSports(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      break;
    
    case FETCH_FILTER_SPORTS_BY_LOCALISATION:
      const lat = parseFloat(action.query.lat);
      const lng = parseFloat(action.query.lng);
      axios
        .get(`${process.env.API_URL}/api/sports/localisation/?lat=${lat}&lng=${lng}`)
        .then((response) => {
          // console.log('response', response.data);
          store.dispatch(saveFilterSports(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      break;
    
    default:
      next(action);
  }
};

export default filter;
