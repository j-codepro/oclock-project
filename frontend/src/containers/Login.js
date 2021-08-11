import { connect } from 'react-redux';
import Login from 'src/components/Login';
import { saveLogin, fetchLogin } from 'src/actions/login';

const mapStateToProps = (state) => ({
  password: state.login.password,
  email: state.login.email,
  user: state.login.user,
  error: state.login.error,
});

const mapDispatchToProps = (dispatch) => ({
  OnChangeValue: (event) => {
    dispatch(saveLogin(event.target.value, event.target.type));
  },
  OnClickLoginForm: (event) => {
    event.preventDefault();
    dispatch(fetchLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
