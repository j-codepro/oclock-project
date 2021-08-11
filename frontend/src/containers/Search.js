import { connect } from 'react-redux';
import Search from 'src/components/Search';

import { fetchUserActivities } from 'src/actions/cards';
import {
  fetchActivitiesByLocalisation, 
  fetchActivitiesByLocalisationAndSports
} from 'src/actions/search';
import { paginationReset } from 'src/actions/moreResults';


const mapStateToProps = (state) => ({
  activities: state.search.activities,
  pageValue: state.moreResults.page,
  count: state.search.count,
  loaded: state.search.loaded,
  userActivitiesIds: state.userActivities.ids,
  userActivitiesCreatorIds: state.userActivities.idsCreator,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivitiesByLocalisation: (query) => {
    dispatch(fetchActivitiesByLocalisation(query));
  },
  fetchUserActivities: () => {
    dispatch(fetchUserActivities());
  },
  fetchActivitiesByLocalisationAndSports: (query) => {
    dispatch(fetchActivitiesByLocalisationAndSports(query));
  },
  paginationReset: () => {
    dispatch(paginationReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
