import { connect } from 'react-redux';
import MapList from 'src/components/MapList';

const mapStateToProps = (state) => ({
  activities: state.search.activities,
  userActivitiesIds: state.userActivities.ids,
  userActivitiesCreatorIds: state.userActivities.idsCreator,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapList);