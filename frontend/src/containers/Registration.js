import { connect } from 'react-redux';
import Registration from 'src/components/Registration';
import {
  saveRegistrationValue,
  fetchRegistrationForm,
} from 'src/actions/registration';

const mapStateToProps = (state) => ({
  pseudo: state.registration.pseudo,
  password: state.registration.password,
  confirmPassword: state.registration.confirmPassword,
  email: state.registration.email,
  firstname: state.registration.firstname,
  lastname: state.registration.lastname,
  city: state.registration.city,
  postalCode: state.registration.postalCode,
  address: state.registration.address,
  presentation: state.registration.presentation,
  isLogged: state.header.isLogged,

  passwordError: state.registration.passwordError,
  emailError: state.registration.emailError,
  pseudoError: state.registration.pseudoError,
  cityError: state.registration.cityError,
});

const mapDispatchToProps = (dispatch) => ({
  OnChangeValue: (event) => {
    dispatch(saveRegistrationValue(event.target.value, event.target.name));
  },
  OnSubmitForm: (event) => {
    event.preventDefault();
    dispatch(fetchRegistrationForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
