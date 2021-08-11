import { connect } from 'react-redux';
import App from 'src/components/App';
import { getUser } from 'src/actions/login';

const mapStateToProps = (state) => ({
  isLogged: state.header.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => {
    dispatch(getUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
