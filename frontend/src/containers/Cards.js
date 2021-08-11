import { connect } from 'react-redux';
import Cards from 'src/components/Cards';

const mapStateToProps = (state) => ({
  isLogged: state.header.isLogged,
  count: state.cards.count,
  activities: state.cards.activities,
  userActivitiesIds: state.userActivities.ids,
  userActivitiesCreatorIds: state.userActivities.idsCreator,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
