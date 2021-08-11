import { connect } from 'react-redux';
import LoginModal from 'src/components/LoginModal';
import {closeModal} from 'src/actions/login'

const mapStateToProps = (state) => ({
  displayed : state.loginModal.displayed,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);