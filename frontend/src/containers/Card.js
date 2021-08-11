import { connect } from 'react-redux';
import Card from 'src/components/Card';
import {showLoginModal} from 'src/actions/cards'

const mapStateToProps = (state) => ({
  isLogged: state.header.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  showLoginModal: () => {
    console.log('showLoginModal');
    dispatch(showLoginModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);